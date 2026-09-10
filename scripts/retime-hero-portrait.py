"""Keep head turns at 1x and resting moments at 0.5x, without re-encoding.

Run from any directory with: python3 scripts/retime-hero-portrait.py
Requires ffmpeg. Turn boundaries are seconds in the original portrait1.mp4.
"""

from pathlib import Path
import subprocess


VIDEOS = Path(__file__).resolve().parents[1] / "public" / "videos"
TURNS = [(2.0, 2.9), (4.9, 5.7), (6.7, 7.5), (9.5, 10.4)]


def retime(timestamp):
    # Double elapsed time, subtracting the extra time for each head turn.
    expression = f"2*({timestamp})"
    for start, end in TURNS:
        expression += f"-clip(({timestamp})-{start}/TB,0,{end - start:.1f}/TB)"
    return expression


duration = f"({retime('PTS+DURATION')})-({retime('PTS')})"
subprocess.run([
    "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
    "-i", str(VIDEOS / "portrait1.mp4"),
    "-map", "0:v:0", "-c:v", "copy", "-an",
    # Preserve the distinct presentation/decode order of H.264 B-frames.
    "-bsf:v", f"setts=pts='{retime('PTS')}':dts='{retime('DTS')}':duration='{duration}'",
    "-movflags", "+faststart",
    str(VIDEOS / "portrait1-paced.mp4"),
], check=True)
