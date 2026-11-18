"""全站字体子集化（F1 铅印宋）。
在仓库根目录运行：python3 tools/build_fonts.py（需要 fonttools + brotli）。

输出 shared/fonts/：
  NotoSerifSC-400.woff2 / NotoSerifSC-600.woff2  中文 + 拉丁正文，字符集优先使用 shared/fonts/charset.txt
  Fraunces-600-opsz72.woff2                      标题拉丁：可变字体固定 opsz 72 / wght 600 / SOFT 0 / WONK 0 成静态字重；只留标题会用到的拉丁
  IBMPlexMono-500.woff2                          编号/英文小字：只留等宽文字会用到的 ASCII
  sizes.json、charset.txt、coverage.json
源字体缓存在 .fontsrc/（缺失时会按 SOURCES 里的官方地址下载）。"""
import json
import pathlib
import re
import subprocess
import sys
import urllib.request

root = pathlib.Path(__file__).resolve().parents[1]
src = root / '.fontsrc'
src.mkdir(exist_ok=True)
out = root / 'shared' / 'fonts'
out.mkdir(parents=True, exist_ok=True)

SOURCES = {
    'NotoSerifSC-Regular.otf': 'https://github.com/notofonts/noto-cjk/raw/main/Serif/SubsetOTF/SC/NotoSerifSC-Regular.otf',
    'NotoSerifSC-SemiBold.otf': 'https://github.com/notofonts/noto-cjk/raw/main/Serif/SubsetOTF/SC/NotoSerifSC-SemiBold.otf',
    'Fraunces-VF.ttf': 'https://github.com/google/fonts/raw/main/ofl/fraunces/Fraunces%5BSOFT,WONK,opsz,wght%5D.ttf',
    'IBMPlexMono-Medium.ttf': 'https://github.com/IBM/plex/raw/master/packages/plex-mono/fonts/complete/ttf/IBMPlexMono-Medium.ttf',
}

for f, u in SOURCES.items():
    if not (src / f).exists():
        print('下载', f)
        urllib.request.urlretrieve(u, src / f)

# ---------- 1. 全站用字（优先使用已提交的 shared/fonts/charset.txt） ----------
ascii_ = ''.join(chr(i) for i in range(0x20, 0x7f))
punct = '·—–…“”‘’→←↑↓×°　、。，．：；！？（）《》〈〉「」『』【】〔〕～・★'


def is_emoji(c):
    o = ord(c)
    return 0x1F000 <= o <= 0x1FAFF or 0x2600 <= o <= 0x27BF or o in (0xFE0F, 0x200D)


charset_file = out / 'charset.txt'
if charset_file.exists():
    charset = charset_file.read_text(encoding='utf-8')
else:
    files = (
        sorted(root.glob('*.html'))
        + [root / 'assets/app.js', root / 'assets/map.js', root / 'assets/site.css']
        + sorted((root / 'shared').glob('*.js'))
    )
    s = ''.join(p.read_text(encoding='utf-8') for p in files if p.exists())
    s += ''.join(chr(int(h, 16)) for h in re.findall(r'\\u([0-9a-fA-F]{4})', s))
    charset = ''.join(
        sorted(
            {c for c in s if ord(c) > 0x7e and not c.isspace() and not is_emoji(c)}
            | set(ascii_)
            | set(punct)
        )
    )
    charset_file.write_text(charset, encoding='utf-8')

# ---------- 2. 标题拉丁（Fraunces）：标题 = 站名牌标题 / 线路名 / 专题名 / 线路徽标 / 站内固定标题 ----------
source_js = (root / 'shared' / 'source.js').read_text(encoding='utf-8')
src_start = source_js.index('{', source_js.index('window.ALP_SOURCE'))
feat = source_js.find('window.ALP_FEATURED', src_start)
src_chunk = source_js[src_start:feat if feat != -1 else None].rstrip()
if src_chunk.endswith(';'):
    src_chunk = src_chunk[:-1]
d = json.loads(src_chunk)
title_txt = (
    'AI 学习路线'
    + ascii_[ascii_.index('0'):ascii_.index('9') + 1]
    + ''.join(chr(c) for c in range(65, 91))
    + ' &+-/()·.,:!?\'"'
)
for l in d.get('lines', []):
    title_txt += l.get('name', '') + l.get('code', '') + ''.join(
        b.get('name', '') + b.get('code', '') for b in l.get('branches', [])
    )
for t in d.get('transfers', d.get('transfer_topics', [])) or []:
    if isinstance(t, dict):
        title_txt += t.get('name', '') + t.get('code', '')
latin_title = ''.join(sorted({c for c in title_txt if 0x20 <= ord(c) < 0x7f}))
mono_txt = ascii_  # 等宽用于站码、英文副标题、GitHub 信息等，实测会出现大小写字母，保留 ASCII

# ---------- 3. 子集化 ----------
def run_mod(module, args):
    subprocess.run([sys.executable, '-m', module] + args, check=True, stderr=subprocess.DEVNULL)


fr_static = src / 'Fraunces-600-opsz72.ttf'
if not fr_static.exists():
    run_mod(
        'fontTools.varLib.instancer',
        [str(src / 'Fraunces-VF.ttf'), 'opsz=72', 'wght=600', 'SOFT=0', 'WONK=0', '--static', '-o', str(fr_static)],
    )

JOBS = [
    # 源文件, 输出名, 字符, 内部改名（OFL 保留名：Plex 必须改；其他为了缺字检查能分辨「是不是我们的字体」也统一改）
    ('NotoSerifSC-Regular.otf', 'NotoSerifSC-400.woff2', charset, 'ALP Subset Serif SC'),
    ('NotoSerifSC-SemiBold.otf', 'NotoSerifSC-600.woff2', charset, 'ALP Subset Serif SC'),
    ('Fraunces-600-opsz72.ttf', 'Fraunces-600-opsz72.woff2', latin_title, 'ALP Subset Fraunces'),
    ('IBMPlexMono-Medium.ttf', 'IBMPlexMono-500.woff2', mono_txt, 'ALP Subset Mono'),
]


def rename(path, fam, sub):
    from fontTools.ttLib import TTFont

    f = TTFont(str(path))
    nm = f['name']
    nm.names = [n for n in nm.names if n.nameID not in (1, 2, 3, 4, 6, 16, 17, 18)]
    for nid, val in (
        (1, fam),
        (2, 'Regular'),
        (3, f'{fam} {sub}; subset of an OFL font, renamed (Reserved Font Name)'),
        (4, f'{fam} {sub}'),
        (6, f'{fam}-{sub}'.replace(' ', '')),
    ):
        nm.setName(val, nid, 3, 1, 0x409)
    f.flavor = 'woff2'
    f.save(str(path))


sizes, cover, missing = {}, {}, {}
for srcf, name, chars, fam in JOBS:
    txt = out / f'_{name}.txt'
    txt.write_text(chars, encoding='utf-8')
    run_mod(
        'fontTools.subset',
        [
            str(src / srcf),
            f'--text-file={txt}',
            '--flavor=woff2',
            f'--output-file={out / name}',
            '--no-hinting',
            '--desubroutinize',
        ],
    )
    txt.unlink()
    rename(out / name, fam, re.search(r'-(\d+)', name).group(1))
    from fontTools.ttLib import TTFont

    cmap = set(chr(c) for c in TTFont(str(out / name)).getBestCmap())
    cover[name] = ''.join(sorted(cmap))
    sizes[name] = (out / name).stat().st_size
    lack = [c for c in chars if c not in cmap and not c.isspace()]
    if lack:
        missing[name] = ''.join(lack)

(out / 'sizes.json').write_text(json.dumps(sizes, indent=1))
(out / 'coverage.json').write_text(json.dumps(cover, ensure_ascii=False))
total = sum(sizes.values())
print(f'字体子集：{len(charset)} 字（非 ASCII {len([c for c in charset if ord(c) > 0x7e])}），标题拉丁 {len(latin_title)}，等宽 {len(mono_txt)}')
for k, v in sizes.items():
    print(f'  {k:28s} {v/1024:6.1f} KB')
print(f'  合计 {total/1024:.1f} KB' + ('  超过 450 KB 预算！' if total > 450 * 1024 else '（预算 450 KB）'))
for k, v in missing.items():
    print(f'  {k} 源字体里没有的字（会回退系统字体）：{v}')
sys.exit(1 if total > 450 * 1024 or missing.get('NotoSerifSC-400.woff2') or missing.get('NotoSerifSC-600.woff2') else 0)
