# cst391milestone

Milestone project for CST-391. Will be made private at end of course.

## Known Issues

1. Database to model mapping has naming inconsistencies. Database uses snake separators ('created_at') while model expects camel case ('createdAt'). This leads to data loss. A row mapper could be implemented in the controller to map the data properly without modifying any queries as a 'cheap' fix.

2. getTeams does not get the Pokemon within each team and ignores the data concern altogether. this must be patched in the final implementation.
