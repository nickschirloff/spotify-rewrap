# This project is no longer under active development.
As I have become more experienced with Typescript, the thought of renewing this project has crossed my mind several times. But the actions of Spotify have routinely soured my interest in doing so.
Here are the reasons as to why (in short):

1. Spotify hardly pays its artists. Already a big issue in the music industry, but Spotify is one of the worst examples.
2. Spotify's CEO invested into a defense company that produces weapons that use AI. On top of that obviously being inhumane and dangerous, this is also plainly antithetical to the point of music, which has traditionally been anti-war.
3. Spotify has lost basically all of what made it special. It felt fun and unique to be on Spotify rather than other apps. That all changed when they started implementing AI in pointless, boring ways, like the DJ. Wrapped has always been a fun experience for me, it was cool seeing my listening habits over the year(s). However, 2024's was *boring*, and felt like it was generated through AI, lacking all creativity that was present before.
4. Spotify pulled a scummy move not long ago where they bumped up the price of the basic ad-free plan, justifying it by adding more audiobook or podcast hours or something (I didn't and don't care enough to look up the specifics). Then, they introduced a new plan below that with ad-free listening, but none of the fluff. Basically, if you didn't notice and change your plan to the new, cheaper option, you would be paying *more* for ad-free listening for the prize of a couple hours of fluff you probably won't use. Excellent work.

As mentioned, I will no longer be working on this project so long as these policies and people are still active at Spotify, which probably means forever. You are allowed to develop the idea for this project on your if you wish, as long as credit for the original idea is provided, and so long as it is not locked behind a paywall.

Please support your favorite artists via Bandcamp or through direct merch and music sales. Consider changing music providers if you use Spotify. I personally download all my music myself, and use the 'Anywhere - Music Player' app on iOS to listen to it. I am not sponsored by them, but I very much recommend that app for music listening. It works great, and has most of the features of other music apps. Getting the music files is the difficult part, but for that, you can download them from your favorite artists' website, or through other means *cough, cough, yt-dlp + MusicBrainz Picard*. This comes with the advantage of not having ads, and you can listen to songs that aren't on any streaming platforms!

I get it's ironic to monologue (to few, if any readers) about this one bad company, when I use the products of multiple others on a daily basis. But any way I can control what my money goes to, I'll take. Plus, it was nice to rant about why my favorite app sucks now.


# ReWrap

Reminisce on your old favorites throughout the years.

ReWrap is a game that will allow users to guess which year a song appeared in their yearly top 100 Spotify Wrapped playlists.

For example:
* Which year did 'Ring of Fire' by Johnny Cash make your top 100 list?
    > 2017/(2020)/2022/(2018)

This project is still currently in development. The roadmap and completed steps are listed below.

<img src="https://github.com/nickschirloff/spotify-rewrap/blob/main/git-images/rewrap-example-1.jpg" align="left" height="600">
<br clear="left">

# Inspiration

A few months ago, I saw a video online of someone who created a 'mega-playlist' comprised of every song that had appeared on  their Wrapped playlists. I thought the idea was fun, so I did the same, shuffling through the playlist and reliving memories with each song that played.

I started to try and guess which year each particular song was frequently in my rotation, and that is where the inspiration for this project was born.

## Some Setup

Spotify's web API does not allow for getting a user's Wrapped playlists. Despite Spotify automatically creating a playlist for Wrapped each year, these
playlists are not returned upon a GET request from the API. Therefore, we have to create a copy, which is easy to do, but unconventional.

* Go to your Wrapped playlist(s)
<img src="https://github.com/nickschirloff/spotify-rewrap/blob/main/git-images/rewrap-step-1.jpg" align="left" height="600">
<br clear="left">

* Tap the three dots icon
* Select "Add to other playlist"

<img src="https://github.com/nickschirloff/spotify-rewrap/blob/main/git-images/rewrap-step-2.jpg" align="left" height="600">
<br clear="left">

* Create a new Playlist. It should be something along "Wrapped - {Year}"

<img src="https://github.com/nickschirloff/spotify-rewrap/blob/main/git-images/rewrap-step-3.jpg" align="left" height="600">
<br clear="left">


The playlist can be named anything as long as it has the word "Wrapped" in the title, as well as a year within 2017-2023 (inclusive, the years Wrapped has been available). The given template is just to ensure playlists are not accidentally skipped by the playlist filter in the app.

If you know of a way to access these playlists, please contact me with the information as to how and hopefully this step can be remedied in the future.

## Run Locally

Clone the project

```bash
  git clone https://github.com/nickschirloff/spotify-rewrap
```

Go to the project directory

```bash
  cd spotify-rewrap
```

Install dependencies

```bash
  npm install
```

Create environment variables (steps listed below)
```
  CLIENT_ID=XXX
  CLIENT_SECRET=XXX
  REDIRECT_URI='http://localhost:8888/callback'
```

Start the server

```bash
  npm run dev
```


## Environment Variables

This project requires a few environment variables that will need a little bit of setup.

* Follow [this guide](https://developer.spotify.com/documentation/web-api) to create a new project. Feel free to name it and set the description to whatever you'd like.

* For the 'Redirect URI' section, enter: 
    > http://localhost:8888/callback 

* Click on your new project, and go to the settings. You should see a Client ID and Client Secret field.

* Now, in the root folder of the project, create a new .env file (notice that it has no name, just the file extension), and enter those two fields like the following:


`CLIENT_ID`= 'your_client_id'

`CLIENT_SECRET`= 'your_client_secret'

`REDIRECT_URI=` = 'http://localhost:8888/callback'

* If you are still confused or are experiencing errors, an example .env file is provided in the root directory.

## Roadmap

- [X] Interacting with Spotify's API to get access tokens

- [ ] Main game functionality

- [ ] Additonal information pages

- [ ] More browser support

- [ ] Live website



## Contributing

As this is still a personal project made to develop my own skills, contributions are not fully open.

If you have any ideas or functionality you still really want to contribute, please go ahead and submit a pull request, I would still love to take a look!



## Contact

Please reach out with feedback or questions at:

Nick Schirloff - schirloffnick@gmail.com

Project Link: https://github.com/nickschirloff/spotify-rewrap
## Acknowledgements

- [Special thanks to Brittany Chiang for her Spotify API tutorial](https://www.newline.co/courses/build-a-spotify-connected-app/course-introduction)

- [Spotify Web API](https://developer.spotify.com/documentation/web-api) 

