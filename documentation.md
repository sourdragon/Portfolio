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

### Laying out the problem
- First we have to update a state variable when the user scrolls, now when this change happens , the unneeded components must animate themselves , then unmount ,and once those are done, the new ones must mount themselves...
1. How to play transition bw each component?
2. What tool to use for layout?
  - Grid 
  - Flexbox + CSS percentage
  - Flex + Grid