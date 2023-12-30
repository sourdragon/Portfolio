# Toggl Track implementation
### GET https://api.track.toggl.com/api/v9/me/time_entries/current
- null if no entry
```json
{
  "id": 3232122766,
  "workspace_id": 5327980,
  "project_id": null,
  "task_id": null,
  "billable": false,
  "start": "2023-12-03T03:44:17+00:00",
  "stop": null,
  "duration": -1701575057,
  "description": "",
  "tags": [],
  "tag_ids": [],
  "duronly": true,
  "at": "2023-12-03T03:44:19+00:00",
  "server_deleted_at": null,
  "user_id": 6820957,
  "uid": 6820957,
  "wid": 5327980
}
```

### Now what ...
[ ] Make a bordered layout + mount and unmount animation (from parent using gsap)
    - absolute positioning
    - flexbox
[ ] Make each component with custom animation if needed

1. How to like position between phone and pc?
Ok firstly we pass isDesktop to the children. But should we pass the size of the screen to the children themselves ? Yea it makes the code less complicated... But how to properly apply margins... And also the props of
- grid-gap 
- colors -> we'll use tailwind for this 
must be changable from the parent compo or from a single point

2. Should the styles be given in the parent component via js or via css?
- We just want to set the position and that can be done via tailwind....

Ta da :) 