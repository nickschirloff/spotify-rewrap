
# ReWrap

Reminisce on your old favorites throughout the years.

ReWrap is a game that will allow users to guess which year a song appeared in their yearly top 100 Spotify Wrapped playlists.

For example:
* Which year did 'Ring of Fire' by Johnny Cash make your top 100 list?
    > 2017/(2020)/2022/(2018)

This project is still currently in development. The roadmap and completed steps are listed below.


# Inspiration

A few months ago, I saw a video online of someone who created a 'mega-playlist' comprised of every song that had appeared on  their Wrapped playlists. I thought the idea was fun, so I did the same, shuffling through the playlist and reliving memories with each song that played.

I started to try and guess which year each particular song was frequently in my rotation, and that is where the inspiration for this project was born.

## Some Setup

Spotify's web API does not allow for getting a user's Wrapped playlists. Despite Spotify automatically creating a playlist for Wrapped each year, these
playlists are not returned upon a GET request from the API. Therefore, we have to create a copy, which is easy to do, but unconventional.

* Go to your Wrapped playlist(s)
![rewrap-step-1](https://github.com/nickschirloff/spotify-rewrap/blob/main/git-images/rewrap-step-1.jpg){height=400}
* Tap the three dots icon
* Select "Add to other playlist"
![rewrap-step-2](https://github.com/nickschirloff/spotify-rewrap/blob/main/git-images/rewrap-step-2.jpg){height=400}
* Create a new Playlist. It should be something along "Wrapped - {Year}"
![rewrap-step-3](https://github.com/nickschirloff/spotify-rewrap/blob/main/git-images/rewrap-step-3.jpg){height=400}


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

