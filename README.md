e2e tests video recorder
===========

In order to use this you need to install ffmpeg on you machine
https://ffmpeg.org/download.html
## You also must add ffmpeg to path in system environment variables

npm install e2e-tests-video-recorder

## Usage

To start using this library, you must include it in your project:

	const Recorder = require("e2e-tests-video-recorder");
	
Create Recorder instance and start recording
  ```js
  const rec = new Recorder("Full/path/to/your/destination/folder", "video_format", fps - optional);
   `````
   You can use it with testing frameworks like Jasmine:
   ````js
   
   beforeAll(() => {
        rec.start();
    })
    
    afterAll(() => {
        rec.stop();
    });
    `````  
