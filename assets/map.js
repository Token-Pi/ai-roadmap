/* ==========================================================================
   assets/map.js — SVG Metro Map Renderer & Interactions
   ========================================================================== */
(function (global) {
  "use strict";

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function domainOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (e) {
      return url;
    }
  }

  /**
   * Render MetroLayout result `R` into `container` as an `<svg class="metro-map">`.
   * Options:
   *  - animate: boolean (intro fade on tracks)
   *  - minScale: number (e.g. 0.85 on index)
   *  - activeBranchTracks: Set<string> (if set, non-matching tracks fade to 0.25)
   *  - visitedIds: Set<string> (visited stations filled with visitedColor)
   *  - visitedColor: string
   *  - transferStations: Set<string> (if set, non-matching stations fade to 0.2, matching get ink ring)
   *  - onTrackClick(lineId, branchId)
   *  - onStationSelect(station, anchorEl)
   */
  function renderMap(container, R, options) {
    options = options || {};
    var F = R.fonts;
    var P = R.params;
    var parts = [];

    var lineColorById = {};
    R.tracks.forEach(function (t) {
      if (t.lineId && t.color) lineColorById[t.lineId] = t.color;
    });

    // 1. Zones (background bands, dividers, labels)
    function zoneBgAt(x) {
      for (var i = 0; i < R.zones.length; i++) {
        var z = R.zones[i];
        if (x >= z.x0 && x < z.x0 + z.w) {
          return (z.index % 2 === 1 || z.terminal) ? "#EAE6DC" : "#F4F1EA";
        }
      }
      return "#F4F1EA";
    }

    R.zones.forEach(function (z, zi) {
      var isBand = z.index % 2 === 1 || !!z.terminal;
      if (isBand) {
        parts.push(
          '<rect class="ml-zone-bg" x="' + z.x0 + '" y="0" width="' + z.w +
          '" height="' + R.height + '" fill="#EAE6DC"/>'
        );
      }
      if (z.x1 != null) {
        var nextZ = R.zones[zi + 1];
        var isTerminalDiv = !!(nextZ && nextZ.terminal);
        if (isTerminalDiv) {
          parts.push(
            '<line class="ml-divider ml-divider--terminal" x1="' + z.x1 + '" y1="0" x2="' + z.x1 +
            '" y2="' + R.height + '" stroke="#111111" stroke-opacity="1" stroke-width="2"/>'
          );
        } else {
          parts.push(
            '<line class="ml-divider" x1="' + z.x1 + '" y1="0" x2="' + z.x1 +
            '" y2="' + R.height + '" stroke="#111111" stroke-opacity="0.22" stroke-width="1" stroke-dasharray="4 4"/>'
          );
        }
      }
      var zoneBg = isBand ? "#EAE6DC" : "#F4F1EA";
      var zoneText = z.label || (z.name + " " + z.en.toUpperCase() + (z.terminal ? " · 终点" : ""));
      parts.push(
        '<text class="ml-zone-label" x="' + (z.x0 + 20) + '" y="' + Math.max(24, P.margin.top - 26) +
        '" font-family=\'' + esc(F.family) + '\' font-size="' + F.zone.size + '" font-weight="' + F.zone.weight +
        '" fill="#111111" stroke="' + zoneBg + '" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke">' +
        esc(zoneText) + "</text>"
      );
    });

    // 2. Tracks, arrows, start/end badges
    var activeTracks = options.activeBranchTracks || null;
    R.tracks.forEach(function (t) {
      var isDim = !!(activeTracks && !activeTracks.has(t.key));
      var dim = isDim ? ' opacity="0.32"' : "";
      parts.push(
        '<path class="ml-track" data-track="' + esc(t.key) + '" data-line="' + esc(t.lineId) +
        '" data-branch="' + esc(t.branchId || "") + '" d="' + esc(t.d) + '" stroke="' + esc(t.color) +
        '" stroke-width="' + P.stroke + '" fill="none" stroke-linecap="round" stroke-linejoin="round"' +
        dim + "/>"
      );

      t.arrows.forEach(function (a) {
        parts.push(
          '<path class="ml-arrow" data-track="' + esc(t.key) + '" data-line="' + esc(t.lineId) +
          '" d="M' + (a.x - 3) + " " + (a.y - 3.5) + " L" + (a.x + 3) + " " + a.y +
          " L" + (a.x - 3) + " " + (a.y + 3.5) +
          '" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"' +
          dim + "/>"
        );
      });

      [t.start, t.end].forEach(function (b) {
        if (!b) return;
        var fillOpacityAttr = isDim ? ' fill-opacity="0.25"' : "";
        var textFill = isDim ? "#111111" : t.textOn;
        if (b.cap && b.cap.terminal) {
          var tcap = b.cap;
          var tcapLabel = (t.name ? t.name + " " : "") + tcap.text;
          var strokeOpacityAttr = isDim ? ' stroke-opacity="0.25"' : "";
          parts.push(
            '<g class="ml-badge ml-cap ml-terminal" data-track="' + esc(t.key) + '" data-line="' + esc(t.lineId) +
            '" data-branch="' + esc(t.branchId || "") + '" tabindex="0" role="link" aria-label="' + esc(tcapLabel) + '">' +
            '<rect x="' + tcap.box.x + '" y="' + tcap.box.y + '" width="' + tcap.w + '" height="' + tcap.h +
            '" rx="' + (tcap.h / 2) + '" fill="#F4F1EA" stroke="' + esc(t.color) + '" stroke-width="3"' + strokeOpacityAttr + "/>" +
            '<text x="' + tcap.textX + '" y="' + (b.y + 4.5) + '" text-anchor="middle" font-size="13" font-weight="600"' +
            ' fill="#111111" data-active-fill="#111111" font-family=\'' + esc(F.family) + '\'>' + esc(tcap.text) + "</text></g>"
          );
        } else if (b.cap) {
          var cap = b.cap;
          var capLabel = (t.name ? t.name + " " : "") + cap.text + "，查看支线";
          parts.push(
            '<g class="ml-badge ml-cap" data-track="' + esc(t.key) + '" data-line="' + esc(t.lineId) +
            '" data-branch="' + esc(t.branchId || "") + '" tabindex="0" role="link" aria-label="' + esc(capLabel) + '">' +
            '<rect x="' + cap.box.x + '" y="' + cap.box.y + '" width="' + cap.w + '" height="' + cap.h +
            '" rx="' + (cap.h / 2) + '" fill="' + esc(t.color) + '"' + fillOpacityAttr + "/>" +
            '<text x="' + cap.textX + '" y="' + (b.y + 3.5) + '" text-anchor="middle" font-size="' + F.cap.size +
            '" font-weight="' + F.cap.weight + '" fill="' + esc(textFill) +
            '" data-active-fill="' + esc(t.textOn) + '" font-family=\'' + esc(F.family) + '\'>' + esc(cap.text) + "</text></g>"
          );
        } else {
          parts.push(
            '<g class="ml-badge" data-track="' + esc(t.key) + '" data-line="' + esc(t.lineId) +
            '" data-branch="' + esc(t.branchId || "") + '">' +
            '<circle cx="' + b.x + '" cy="' + b.y + '" r="' + P.badgeR + '" fill="' + esc(t.color) + '"' + fillOpacityAttr + "/>" +
            '<text x="' + b.x + '" y="' + (b.y + 3.5) + '" text-anchor="middle" font-size="' + F.cap.size +
            '" font-weight="' + F.cap.weight + '" fill="' + esc(textFill) +
            '" data-active-fill="' + esc(t.textOn) + '" font-family=\'' + esc(F.family) + '\'>' + esc(t.code) + "</text></g>"
          );
        }
      });
    });

    // 3. Stations & Labels
    var visited = options.visitedIds || null;
    var visitedColor = options.visitedColor || "#111111";
    var transferSet = options.transferStations || null;

    R.stations.forEach(function (st) {
      var m = st.marker;
      var isVisited = visited && visited.has(st.id);
      var fill = isVisited ? visitedColor : "#FFFFFF";
      var inTransfer = !transferSet || transferSet.has(st.id);
      var stOpacity = transferSet && !inTransfer ? ' opacity="0.28"' : "";
      var lineAttr = esc(st.lines.join(","));

      var markerHtml = "";
      if (transferSet && inTransfer) {
        if (m.kind === "interchange") {
          markerHtml +=
            '<rect x="' + (m.x - m.r - 4) + '" y="' + (m.y0 - m.r - 4) + '" width="' + (2 * m.r + 8) +
            '" height="' + (m.y1 - m.y0 + 2 * m.r + 8) + '" rx="' + (m.r + 4) +
            '" fill="none" stroke="#111111" stroke-width="2"/>';
        } else {
          markerHtml +=
            '<circle cx="' + m.x + '" cy="' + m.y0 + '" r="' + (m.r + 4) +
            '" fill="none" stroke="#111111" stroke-width="2"/>';
        }
      }

      if (m.kind === "interchange") {
        markerHtml +=
          '<rect class="ml-marker" x="' + (m.x - m.r) + '" y="' + (m.y0 - m.r) +
          '" width="' + (2 * m.r) + '" height="' + (m.y1 - m.y0 + 2 * m.r) +
          '" rx="' + m.r + '" fill="' + esc(fill) + '" stroke="#111111" stroke-width="2.5"/>';
      } else if (m.kind === "terminal") {
        var termColor = lineColorById[st.lines[0]] || "#111111";
        markerHtml +=
          '<circle class="ml-marker ml-marker--terminal" cx="' + m.x + '" cy="' + m.y0 + '" r="' + m.r +
          '" fill="' + esc(fill) + '" stroke="#111111" stroke-width="3.5"/>' +
          '<circle cx="' + m.x + '" cy="' + m.y0 + '" r="4" fill="' + esc(isVisited ? "#FFFFFF" : termColor) + '"/>';
      } else {
        markerHtml +=
          '<circle class="ml-marker" cx="' + m.x + '" cy="' + m.y0 + '" r="' + m.r +
          '" fill="' + esc(fill) + '" stroke="#111111" stroke-width="2.5"/>';
      }

      var fullTitle = st.fullName || st.name;
      var interactiveAttr = options.onStationSelect
        ? ' tabindex="0" role="button" aria-label="' + esc(fullTitle) + '"'
        : "";

      parts.push(
        '<g class="ml-station" data-station="' + esc(st.id) + '" data-lines="' + lineAttr + '"' +
        stOpacity + interactiveAttr + ">" + markerHtml + "</g>"
      );

      var L = st.label;
      var labelBg = zoneBgAt(L.ax);
      L.rows.forEach(function (r) {
        if (r.kind === "more") {
          var trackParts = (r.track || "").split("/");
          var mLineId = trackParts[0] || st.lines[0] || "";
          var mBranchId = (trackParts[1] && trackParts[1] !== "tail") ? trackParts[1] : "";
          var mDim = !!(activeTracks && !activeTracks.has(r.track));
          var mFillOp = mDim ? ' fill-opacity="0.25"' : "";
          var mTextFill = mDim ? "#111111" : r.textOn;
          var mAria = (r.text || "") + "，查看详情";
          parts.push(
            '<g class="ml-more" data-track="' + esc(r.track || "") + '" data-line="' + esc(mLineId) +
            '" data-branch="' + esc(mBranchId) + '" tabindex="0" role="link" aria-label="' + esc(mAria) + '">' +
            '<rect x="' + r.pill.x + '" y="' + r.pill.y + '" width="' + r.pill.w + '" height="' + r.pill.h +
            '" rx="' + (r.pill.h / 2) + '" fill="' + esc(r.color) + '"' + mFillOp + "/>" +
            '<text x="' + r.textX + '" y="' + r.baseline + '" text-anchor="middle" font-family=\'' + esc(F.family) +
            '\' font-size="13" font-weight="600" fill="' + esc(mTextFill) + '" data-active-fill="' + esc(r.textOn) + '">' +
            esc(r.text) + "</text></g>"
          );
          return;
        }
        var labelAria = r.kind === "name" && fullTitle ? ' aria-label="' + esc(fullTitle) + '"' : "";
        var activeFill = r.kind === "code" ? "#55524C" : "#111111";
        var baseFill = (transferSet && !inTransfer) ? "#665F55" : activeFill;
        var yPos = r.baseline;
        if (r.kind === "code") {
          for (var si = 0; si < R.stations.length; si++) {
            var sm = R.stations[si].marker;
            var smy = (sm.y1 != null) ? sm.y1 : sm.y0;
            if (Math.abs(sm.x - L.ax) < 40 && r.baseline < smy && r.baseline >= smy - 12) {
              yPos = r.baseline - 3;
              break;
            }
          }
        }
        parts.push(
          '<text class="ml-label" data-station="' + esc(st.id) + '" data-lines="' + lineAttr +
          '" data-active-fill="' + activeFill + '" data-base-fill="' + baseFill +
          '" x="' + L.ax + '" y="' + yPos + '" text-anchor="' + L.anchor +
          '" font-family=\'' + esc(r.kind === "code" ? F.mono : F.family) +
          '\' font-size="' + (r.kind === "code" ? F.code.size : F.name.size) +
          '" font-weight="' + (r.kind === "code" ? F.code.weight : F.name.weight) +
          '" fill="' + baseFill + '" stroke="' + labelBg +
          '" stroke-width="3.5" stroke-linejoin="round" paint-order="stroke"' + labelAria + ">" +
          esc(r.text) + "</text>"
        );
      });
    });

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "metro-map" + (options.animate ? " metro-map--animate" : ""));
    svg.setAttribute("viewBox", "0 0 " + R.width + " " + R.height);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", options.ariaLabel || "AI 学习路线地铁线路图");

    if (options.minScale && options.minScale < 1) {
      svg.style.minWidth = Math.round(R.width * options.minScale) + "px";
      svg.style.width = "100%";
      svg.style.maxWidth = R.width + "px";
    } else {
      svg.style.minWidth = R.width + "px";
      svg.style.width = R.width + "px";
      svg.style.maxWidth = R.width + "px";
    }

    svg.innerHTML = parts.join("");
    container.innerHTML = "";
    container._metroLayout = R;
    container.appendChild(svg);

    if (R.cuts && R.cuts.length) {
      var padL = parseFloat(getComputedStyle(container).paddingLeft) || 0;
      var snapLayer = document.createElement("div");
      snapLayer.className = "map-snap-layer";
      snapLayer.setAttribute("aria-hidden", "true");
      var snapHtml = '<div class="map-snap-point" style="left:0"></div>';
      R.cuts.forEach(function (c) {
        var cx = Math.round((c[0] + c[1]) / 2);
        snapHtml += '<div class="map-snap-point" style="left:' + (padL + cx) + 'px"></div>';
      });
      snapLayer.innerHTML = snapHtml;
      container.appendChild(snapLayer);
    }

    bindMapEvents(svg, R, options);
    return svg;
  }

  function bindMapEvents(svg, R, options) {
    if (options.enableLineHover) {
      svg.addEventListener("mouseover", function (e) {
        var track = e.target.closest(".ml-track, .ml-badge, .ml-more");
        if (track) {
          highlightLine(svg, track.getAttribute("data-line"));
          return;
        }
        var st = e.target.closest(".ml-station");
        if (st) {
          var lines = (st.getAttribute("data-lines") || "").split(",").filter(Boolean);
          if (lines.length === 1) {
            highlightLine(svg, lines[0]);
          }
        }
      });

      svg.addEventListener("mouseout", function (e) {
        var related = e.relatedTarget;
        if (!related || !svg.contains(related)) {
          clearHighlight(svg);
        } else if (!related.closest(".ml-track, .ml-badge, .ml-more, .ml-station")) {
          clearHighlight(svg);
        }
      });
    }

    if (options.onTrackClick) {
      svg.addEventListener("click", function (e) {
        var el = e.target.closest(".ml-track, .ml-badge, .ml-more");
        if (!el) return;
        options.onTrackClick(el.getAttribute("data-line"), el.getAttribute("data-branch") || "");
      });

      svg.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        var el = e.target.closest(".ml-cap, .ml-more");
        if (el) {
          e.preventDefault();
          options.onTrackClick(el.getAttribute("data-line"), el.getAttribute("data-branch") || "");
        }
      });
    }

    if (options.onStationSelect) {
      var activateStation = function (stEl) {
        var id = stEl.getAttribute("data-station");
        var st = R.stationById[id];
        if (st) options.onStationSelect(st, stEl);
      };

      svg.addEventListener("click", function (e) {
        var stEl = e.target.closest(".ml-station");
        if (stEl) {
          e.stopPropagation();
          activateStation(stEl);
        }
      });

      svg.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        var stEl = e.target.closest(".ml-station");
        if (stEl) {
          e.preventDefault();
          activateStation(stEl);
        }
      });
    }
  }

  function highlightLine(svg, lineId) {
    if (!svg || !lineId) return;
    svg.querySelectorAll(".ml-track, .ml-arrow").forEach(function (el) {
      el.style.opacity = el.getAttribute("data-line") === lineId ? "1" : "0.15";
    });
    svg.querySelectorAll(".ml-badge, .ml-more").forEach(function (el) {
      var match = el.getAttribute("data-line") === lineId;
      var shape = el.querySelector("rect, circle");
      var text = el.querySelector("text");
      if (el.classList.contains("ml-terminal")) {
        if (shape) shape.style.strokeOpacity = match ? "1" : "0.25";
        if (text) {
          text.style.fill = "#111111";
          text.style.fillOpacity = "1";
        }
      } else {
        if (shape) shape.style.fillOpacity = match ? "1" : "0.25";
        if (text) {
          text.style.fill = match ? (text.getAttribute("data-active-fill") || "#FFFFFF") : "#111111";
          text.style.fillOpacity = "1";
        }
      }
    });
    svg.querySelectorAll(".ml-station").forEach(function (el) {
      var lines = (el.getAttribute("data-lines") || "").split(",");
      el.style.opacity = lines.indexOf(lineId) >= 0 ? "1" : "0.15";
    });
    svg.querySelectorAll(".ml-label").forEach(function (el) {
      var lines = (el.getAttribute("data-lines") || "").split(",");
      var match = lines.indexOf(lineId) >= 0;
      el.style.fill = match ? (el.getAttribute("data-active-fill") || "#111111") : "#665F55";
    });
  }

  function highlightTransfer(svg, stationIdSet) {
    if (!svg || !stationIdSet) return;
    svg.querySelectorAll(".ml-track, .ml-arrow").forEach(function (el) {
      el.style.opacity = "0.2";
    });
    svg.querySelectorAll(".ml-badge, .ml-more").forEach(function (el) {
      var shape = el.querySelector("rect, circle");
      var text = el.querySelector("text");
      if (el.classList.contains("ml-terminal")) {
        if (shape) shape.style.strokeOpacity = "0.25";
      } else {
        if (shape) shape.style.fillOpacity = "0.25";
      }
      if (text) {
        text.style.fill = "#111111";
        text.style.fillOpacity = "1";
      }
    });
    svg.querySelectorAll(".ml-station").forEach(function (el) {
      var id = el.getAttribute("data-station");
      el.style.opacity = stationIdSet.has(id) ? "1" : "0.15";
    });
    svg.querySelectorAll(".ml-label").forEach(function (el) {
      var id = el.getAttribute("data-station");
      var match = stationIdSet.has(id);
      el.style.fill = match ? (el.getAttribute("data-active-fill") || "#111111") : "#665F55";
    });
  }

  function clearHighlight(svg) {
    if (!svg) return;
    svg.querySelectorAll(".ml-track, .ml-arrow, .ml-station").forEach(function (el) {
      el.style.opacity = "";
    });
    svg.querySelectorAll(".ml-badge rect, .ml-badge circle, .ml-more rect").forEach(function (el) {
      el.style.fillOpacity = "";
      el.style.strokeOpacity = "";
    });
    svg.querySelectorAll(".ml-badge text, .ml-more text").forEach(function (el) {
      el.style.fill = "";
      el.style.fillOpacity = "";
    });
    svg.querySelectorAll(".ml-label").forEach(function (el) {
      el.style.fill = el.getAttribute("data-base-fill") || "";
    });
  }

  /**
   * Position a popover element cleanly next to an SVG anchor element, clamped to viewport.
   * Priority: right -> left -> above -> below; never covers the clicked station marker.
   */
  function positionPopover(popover, anchorEl) {
    var rect = anchorEl.getBoundingClientRect();
    popover.hidden = false;
    var pw = popover.offsetWidth || 320;
    var ph = popover.offsetHeight || 260;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var pad = 12;
    var gap = 14;

    var clamp = function (val, min, max) {
      return Math.max(min, Math.min(val, max));
    };

    var left;
    var top;

    if (rect.right + gap + pw <= vw - pad) {
      left = rect.right + gap;
      top = clamp(rect.top + rect.height / 2 - ph / 2, pad, vh - ph - pad);
    } else if (rect.left - gap - pw >= pad) {
      left = rect.left - pw - gap;
      top = clamp(rect.top + rect.height / 2 - ph / 2, pad, vh - ph - pad);
    } else {
      left = clamp(rect.left + rect.width / 2 - pw / 2, pad, vw - pw - pad);
      if (rect.top - gap - ph >= pad) {
        top = rect.top - ph - gap;
      } else if (rect.bottom + gap + ph <= vh - pad) {
        top = rect.bottom + gap;
      } else {
        var spaceAbove = rect.top - pad;
        var spaceBelow = vh - pad - rect.bottom;
        top = spaceAbove >= spaceBelow
          ? clamp(rect.top - ph - gap, pad, vh - ph - pad)
          : clamp(rect.bottom + gap, pad, vh - ph - pad);
      }
    }

    popover.style.left = Math.round(left) + "px";
    popover.style.top = Math.round(top) + "px";
  }

  function updateMapClip(scrollEl, R) {
    R = R || (scrollEl && scrollEl._metroLayout);
    if (!scrollEl || !R || !R.cuts || !R.cuts.length) return;
    var maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    if (maxScroll <= 2) {
      scrollEl.style.clipPath = "";
      return;
    }
    var padL = parseFloat(getComputedStyle(scrollEl).paddingLeft) || 0;
    var s = scrollEl.scrollLeft;
    var viewW = scrollEl.clientWidth;
    var i, c0, c1;
    // 右缘：可见区右边若落在字上，实色裁到左边最近的无字竖带
    var clipR = 0;
    var rightSvg = s - padL + viewW;
    if (s < maxScroll - 2 && rightSvg < R.width - 2) {
      for (i = R.cuts.length - 1; i >= 0; i--) {
        c0 = R.cuts[i][0]; c1 = R.cuts[i][1];
        if (c0 + 2 <= rightSvg) {
          if (rightSvg > c1 - 2) clipR = Math.max(0, Math.ceil(rightSvg - Math.max(c0 + 2, c1 - 2)));
          break;
        }
      }
    }
    // 左缘：滚动后可见区左边若落在字上，同样裁到右边最近的无字竖带（滚到最右时也成立）
    var clipL = 0;
    var leftSvg = s - padL;
    if (s > 2 && leftSvg > 2) {
      for (i = 0; i < R.cuts.length; i++) {
        c0 = R.cuts[i][0]; c1 = R.cuts[i][1];
        if (c1 - 2 >= leftSvg) {
          if (leftSvg < c0 + 2) clipL = Math.max(0, Math.ceil(Math.min(c1 - 2, c0 + 2) - leftSvg));
          break;
        }
      }
    }
    if (clipR >= viewW * 0.45) clipR = 0;
    if (clipL >= viewW * 0.45) clipL = 0;
    scrollEl.style.clipPath = (clipR > 0 || clipL > 0) ? "inset(0 " + clipR + "px 0 " + clipL + "px)" : "";
  }

  function syncScrollHint(frameEl, R) {
    if (!frameEl) return;
    var scrollEl = frameEl.querySelector(".map-scroll");
    var hintEl = frameEl.querySelector(".map-scroll-hint");
    if (!scrollEl || !hintEl) return;
    R = R || scrollEl._metroLayout;
    var rafPending = false;
    var update = function () {
      rafPending = false;
      var canScroll = scrollEl.scrollWidth > scrollEl.clientWidth + 2;
      hintEl.hidden = !canScroll;
      scrollEl.classList.toggle("is-scrolled-left", canScroll && scrollEl.scrollLeft > 2);
      scrollEl.classList.toggle("is-scrolled-right", canScroll && (scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth - 2));
      updateMapClip(scrollEl, R);
    };
    var onScroll = function () {
      if (rafPending) return;
      rafPending = true;
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(update);
      } else {
        update();
      }
    };
    update();
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(update);
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    scrollEl.addEventListener("scrollend", update, { passive: true });
    window.addEventListener("resize", update);

    if (hintEl.tagName === "BUTTON" && !hintEl._boundScrollEnd) {
      hintEl._boundScrollEnd = true;
      hintEl.addEventListener("click", function () {
        var targetLeft = scrollEl.scrollWidth - scrollEl.clientWidth;
        scrollEl.scrollTo({ left: targetLeft, behavior: "smooth" });
      });
    }
  }

  /**
   * Scroll a horizontal map container to center/show `st`, aligning left edge
   * to `R.cuts` and clipping the right edge to the nearest cut if needed.
   */
  function scrollMapToStation(scrollEl, st, mapWidthOrR) {
    if (!scrollEl || !st) return;
    var maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    if (maxScroll <= 2) return;
    var R = (mapWidthOrR && typeof mapWidthOrR === "object") ? mapWidthOrR : scrollEl._metroLayout;
    var padL = parseFloat(getComputedStyle(scrollEl).paddingLeft) || 0;
    var viewW = scrollEl.clientWidth;
    var ideal = Math.max(0, Math.min(maxScroll, Math.round(st.x + padL - viewW * 0.25)));

    if (!R || !R.cuts || !R.cuts.length) {
      scrollEl.scrollLeft = ideal;
      return;
    }

    var cands = [0];
    R.cuts.forEach(function (c) {
      var cx = Math.round(padL + (c[0] + c[1]) / 2);
      if (cx >= 0 && cx <= maxScroll) cands.push(cx);
    });

    function clipNeededAt(s) {
      if (s >= maxScroll - 2) return 0;
      var rightSvg = s - padL + viewW;
      if (rightSvg >= R.width - 2) return 0;
      for (var i = R.cuts.length - 1; i >= 0; i--) {
        var c0 = R.cuts[i][0];
        var c1 = R.cuts[i][1];
        if (c0 + 2 <= rightSvg) {
          if (rightSvg <= c1 - 2) return 0;
          return Math.max(0, Math.ceil(rightSvg - Math.max(c0 + 2, c1 - 2)));
        }
      }
      return 9999;
    }

    var bestX = ideal;
    var bestScore = Infinity;
    for (var i = 0; i < cands.length; i++) {
      var s = cands[i];
      var leftSvg = s - padL;
      var clip = clipNeededAt(s);
      var rightVisible = leftSvg + viewW - clip;
      // Ensure target station is comfortably visible
      if (st.x < leftSvg + 36 || st.x > rightVisible - 48) continue;
      var sc = clip * 2 + Math.abs(s - ideal);
      if (sc < bestScore) {
        bestScore = sc;
        bestX = s;
      }
    }

    if (bestScore === Infinity) {
      // Fallback: closest cut to ideal
      for (var j = 0; j < cands.length; j++) {
        var s2 = cands[j];
        var sc2 = Math.abs(s2 - ideal);
        if (sc2 < bestScore) {
          bestScore = sc2;
          bestX = s2;
        }
      }
    }

    scrollEl.scrollLeft = bestX;
    updateMapClip(scrollEl, R);
  }

  global.MetroMapUI = {
    renderMap: renderMap,
    highlightLine: highlightLine,
    highlightTransfer: highlightTransfer,
    clearHighlight: clearHighlight,
    positionPopover: positionPopover,
    syncScrollHint: syncScrollHint,
    scrollMapToStation: scrollMapToStation,
    domainOf: domainOf,
    esc: esc
  };
})(window);
