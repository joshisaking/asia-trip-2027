#!/usr/bin/env python3
"""Generate the PWA icons (sunset gradient + paper plane) with zero dependencies.

Run from the repo root:  python3 scripts/generate-icons.py
Outputs: icons/icon-512.png, icons/icon-192.png, icons/apple-touch-icon.png
"""
import struct, zlib, os

# ---- palette ----
GRAD = [(0.0, (0xFF, 0x9E, 0x57)), (0.5, (0xFF, 0x5D, 0x8A)), (1.0, (0x8E, 0x5C, 0xF7))]
SUN = (0xFF, 0xEA, 0xA0)
WING1 = (0xFF, 0xFF, 0xFF)
WING2 = (0xE9, 0xE4, 0xFF)

# ---- geometry in unit space (matches icons/favicon.svg, scaled /64) ----
SUN_C, SUN_R = (0.80, 0.20), 0.14
TRI1 = [(0.781, 0.359), (0.219, 0.625), (0.484, 0.641)]
TRI2 = [(0.781, 0.359), (0.484, 0.641), (0.438, 0.813)]


def grad_color(t):
    for (t0, c0), (t1, c1) in zip(GRAD, GRAD[1:]):
        if t <= t1:
            f = 0 if t1 == t0 else (t - t0) / (t1 - t0)
            return tuple(round(a + (b - a) * f) for a, b in zip(c0, c1))
    return GRAD[-1][1]


def in_tri(px, py, tri):
    (x1, y1), (x2, y2), (x3, y3) = tri
    d1 = (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2)
    d2 = (px - x3) * (y2 - y3) - (x2 - x3) * (py - y3)
    d3 = (px - x1) * (y3 - y1) - (x3 - x1) * (py - y1)
    neg = (d1 < 0) or (d2 < 0) or (d3 < 0)
    pos = (d1 > 0) or (d2 > 0) or (d3 > 0)
    return not (neg and pos)


def pixel(u, v):
    dx, dy = u - SUN_C[0], v - SUN_C[1]
    if in_tri(u, v, TRI1):
        return WING1
    if in_tri(u, v, TRI2):
        return WING2
    if dx * dx + dy * dy <= SUN_R * SUN_R:
        return SUN
    return grad_color((u + v) / 2)


def render(size, ss=2):
    big = size * ss
    rows = []
    for y in range(size):
        row = bytearray([0])  # PNG filter type 0
        for x in range(size):
            r = g = b = 0
            for sy in range(ss):
                for sx in range(ss):
                    u = (x * ss + sx + 0.5) / big
                    v = (y * ss + sy + 0.5) / big
                    pr, pg, pb = pixel(u, v)
                    r += pr; g += pg; b += pb
            n = ss * ss
            row += bytes((r // n, g // n, b // n))
        rows.append(bytes(row))
    return b"".join(rows)


def write_png(path, size, raw):
    def chunk(tag, data):
        c = tag + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c))

    ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)
    png = (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
           + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))
    with open(path, "wb") as f:
        f.write(png)
    print(f"wrote {path} ({size}x{size})")


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    icons = os.path.join(here, "..", "icons")
    os.makedirs(icons, exist_ok=True)
    for name, size in [("icon-512.png", 512), ("icon-192.png", 192), ("apple-touch-icon.png", 180)]:
        write_png(os.path.join(icons, name), size, render(size))
