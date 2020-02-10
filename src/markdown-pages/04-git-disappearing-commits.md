---
title: "Git Tutorial or The Mystery of the Disappearing Commits"
date: "2018-07-06"
description: "Git Tutorial or The Mystery of the Disappearing Commits."
---

This week I am going to write about a problem we had with our Git “commits” which gave us quite a scare. At the beginning of the week we deployed a new version to the production environment, and to our chagrin discovered that not all of the code changes found themselves in production. This was very weird because all of these changes were tested in the QA environment. The only explanation was therefore that the information was somehow lost while merging from the development branch to the master.

Upon further investigation, we found that the missing “commits” were also absent from the development branch. This gave us a great shock because we knew for sure that we deployed this code to the QA environment. Even more confusing was the fact that we couldn’t find the “commits” anywhere in the Git history.

The fact we couldn’t find any mention of these commits in the Git history indicated an even greater problem. If we cannot trust the Git to keep a record of our development process, then how can we know if we are not missing additional features previously deployed?

**So where did the “commits” disappear to?**

Eventually, we found the culprit of our frustration. It turned out that a Git management product used by several team members was configured to do a “force push” on certain circumstances. It was also configured to do an auto-merge in case a team member pushed a commit. This way when one team member accidentally performed a force push another did a merge to his code which removed the previously committed work.

How do we make sure this doesn’t happen again? First, we turn off the option to perform a force push in the stash itself. Second, we stop working with said Git management product.

Code management is crucial for any project. Therefore, I decided to include in this post a list of cli commands for using Git.

```
$ git init [project-name] - Start a new local repository

$ git clone [url] - Clone a repository from url

$ git status - Lists all new or modified files to be committed

$ git diff - Show file differences not yet staged

$ git add [file] - Add file for versioning

$ git diff —staged - Show file differences between staging and the last file version

$ git reset [file] - Unstage the file, but preserves its contents

$ git commit -m”[descriptive message]” - Commit  permanently in version history

$ git branch - Lists all local branches in the current repository

$ git branch [branch-name] - Creates a new branch

$ git checkout [branch-name] - Switches to the specified branch and updates working directory

$ git merge [branch-name] - Combines the specified branch’s history into the current branch

$ git branch -d [branch-name] - Deletes the specified branch

$ git fetch [remote] - Downloads all history from the remote repository

$ git merge [remote]/[branch] - Combines the remote branch into the current local branch

$ git push [remote] [branch] - Uploads all local branch commits to Git

$ git pull - Downloads bookmark history and incorporates changes
```