
export const timeComponent = {
  "component": {
    "componentType": "time",
    "component": {
      "fields": {
        "time": "08:30:00Z"
      }
    }
  }
}

export const videoComponent = {
  "component": {
    "componentType": "video",
    "component": {
      "fields": {
        "title": "Test Video",
        "isSermonVideo": true,
        "videoURL": "www.videosite.com/98shda",
        "duration": 600,
        "numberOfViews": 0
      }
    }
  }
}

export const ageGroupComponent = {
  "component": {
    "componentType": "ageGroup",
    "component": {
      "fields": {
        "lowerBound": 8,
        "upperBound": 88,
        "isAge": true,
        "isGrade": false
      }
    }
  }
}

export const audioComponent = {
  "component": {
    "componentType": "audio",
    "component": {
      "fields": {
        "title": "Some test audio",
        "isSermonAudio": false,
        "audioURL": "fakesite.com/80h34qf",
        "duration": 600,
        "numberOfListens": 0
      }
    }
  }
}

export const orderOfEventComponent = {
  "component": {
    "componentType": "orderOfEvent",
    "component": {
      "fields": {
        "eventElements": {
        "orderOfEventComponentMembers(s)": [
            {
              "title": "Introduction",
              "order": 1,
              "duration": "00:03:00Z",
              "colorCode": "FF0000"
            },
            {
              "title": "Worship",
              "order": 2,
              "duration": "00:06:00Z",
              "colorCode": "00FF00"
            },
            {
              "title": "Conclusion",
              "order": 3,
              "duration": "00:06:00Z",
              "colorCode": "00FF00"
            }
          ]
        }
      }
    }
  }
}

export const pdfComponent = {
  "component": {
    "componentType": "pdf",
    "component": {
      "fields": {
        "title": "A test pdf",
        "pdfURL": "fakepdfsite.com/87sdafhi"
      }
    }
  }
}

export const reminderComponent = {
  "component": {
    "componentType": "reminder",
    "component": {
      "fields": {
        "reminderTime": "2018-08-18T12:00:00Z",
        "text": "Some reminder text"
      }
    }
  }
}
export const speakerComponent = {
  "component": {
    "componentType": "speaker",
    "component": {
      "fields": {
        "isInChurch": false,
        "speakerID": null,
        "speakerName": "Andy Stanley"
      }
    }
  }
}
export const textFieldComponent = {
  "component": {
    "componentType": "textField",
    "component": {
      "fields": {
        "title": "Some important text",
        "text": "This is some text for the text field"
      }
    }
  }
}