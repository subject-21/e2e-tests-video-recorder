e2e tests video recorder
===========

## Installation

This module is installed via npm:

``` bash
$ npm install e2e-tests-video-recorder
```

*Note:* In order to use this you need to install [ffmpeg](https://ffmpeg.org/download.html) on you machine,
You also must add ffmpeg to path in system environment variables.


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
