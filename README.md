# mioSaysonDiscord
### MioSays Discord Bot

A Discord Bot based on Keptan's ["MioSays"](https://github.com/keptan/MioSays).
Takes in text from discord user, pipes into shell script, and sends back the image.
There is also an added fortune ability where it can use fortune regularly or with a custom file.

## Example
![Example](https://github.com/Dropkick500/mioSaysOnDiscord/blob/master/example.png "")

## Requirements
[Node.js(With NPM)](https://nodejs.org/en/), [Discord.js](https://discord.js.org/), [ExecSync](https://www.npmjs.com/package/execSync/), [fortune-mod](https://github.com/shlomif/fortune-mod), [ImageMagick](https://imagemagick.org/) and the Aforementioned Shell Script to run.

## Installation and Running with apt
```
sudo apt-get install fortune-mod npm imagemagick
npm install discord.js execsync
git clone git://Dropkick500/mioSaysOnDiscord.git
cd mioSaysOnDiscord
./start.sh
```
## Adding mioquotes
As the included mioquotes are highly esoteric, you can use the following method to make your own mioquote file:
* Create a plain text file with the title "mioquotes" with content matching the following template:
```
quote 1
%
quote 2
```
* Run the command ```strfile mioquotes```
* Include both the plain text file and the .dat file in the same directory as index.js.
