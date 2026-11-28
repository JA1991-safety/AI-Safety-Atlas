# The Reasonable Path

A simulator of gradual disempowerment: each choice looks reasonable on its own, and together they hand more and more over to AI.

## Files

- `reasonable-path.html`: the simulator.
- `weights.json`: the scoring weights. The page loads this file when it sits next to it, and falls back to the defaults built into the page if it can't.

The in-page "save weights" control only works inside Claude, where the page was first published. On GitHub Pages, change the weights by editing `weights.json` directly.
