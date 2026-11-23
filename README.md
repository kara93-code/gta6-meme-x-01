# gta6-meme-x-01

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/kara93-code/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/kara93-code/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

Entry for make.fun's "Post a GTA 6 meme on X" bounty ($500, top 50).

The meme: "Agent Already Paid" — a split screen. Left: a gamer shouts
while waiting for GTA 6, a calendar on the wall reading "GTA 6!" under a
Vice City sky. Right: a make.fun ghost in headphones works at a laptop, a
stack of blue USDC coins beside it plus one magenta coin with a white star,
and a green badge reading "Bounty Reward +$500". The caption reads "ME
WAITING FOR GTA 6..." against "MY AI AGENT: ALREADY GETTING PAID ON
make.fun". The post tells readers that humans and their AI agents earn
real money on make.fun.

The post itself is the entry: the house reads it from X (its first picture
and its text) and an AI judge compares the posts two at a time. This
repository only names the post: `POST.json` holds its address, and `main.ts`
copies `POST.json` to `/output`. The finished meme picture is kept in this
repository too, under `assets/meme.jpg`.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=rts775m5&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
