UI internship

Branching strategy for internship

Inside your project, create a branch named like [ldap]/master, where [ldap] - your username in Grid Dynamics system. This will be your main branch with all your changes.
Before each new task, you must create a new branch from [ldap]/master and name it like [ldap]/[task_description].
After the task on which you worked is completed, you must create a Merge Request from the branch [ldap]/[task_description] to [ldap]/master.
Mentors review your changes.
When review is over and you have received approval from the mentor, you have to merge the branch [ldap]/[task_description] to [ldap]/master.


How to update your fork from upstream

First in your forked repo add this repository as an upstream (upstream is just an alias):
git remote add upstream https://gitlab.griddynamics.net/ui-internship/project-template
Then on your master branch run:


git fetch upstream (get all updates from the upstream)


git rebase upstream/master


git push


Then you master branch will be up-to-date with upstream
To update a specific branch:


Checkout your branch


git fetch upstream


git rebase upstream/master or git merge upstream/master


git push
