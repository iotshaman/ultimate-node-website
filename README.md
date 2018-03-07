

A simple website starter kit, built with SEO (Seach Engine Optimization) in mind. This starter kit is built on top of Node Js / Express / Shaman Website Compiler, and was designed to give small website developers and hobbyists access to blazing speeds, advanced caching and compression, built-in templating, asset minification, and more! This project is maintained by [IoT Shaman](https://www.iotshaman.com) and has a complimentary tutorial on how to host your own website, in the cloud, for free. [Click here](https://www.iotshaman.com/blog/content/how-to-host-your-website-for-free-in-5-easy-steps) to read the small blog article and learn how to setup your own website in 5 easy steps. 

### Requirements

In order to use download this package you will need the following resource(s):

- git
- npm

### Quick Start

The first thing you need to do is clone this repository. Open a command line terminal and navigate to the folder you want to download the package to; then enter the following commands:

```shell
git clone https://github.com/iotshaman/ultimate-node-website.git
cd ultimate-node-website
```

The first command will download the package and the second command will navigate into the newly created package folder. Next we want to install the package dependencies so we can test our application locally. In the same command terminal, enter the following command:

```shell
npm install
```

Now all we need to do to verify everything is working properly is to start the application locally. In the same terminal, enter the following command:

```shell
npm start
```

You should see some command line output, and somewhere in there it should say 'Application available at port: 3000'. This means that a Node Js server is now running locally on your computer and is available to server your website's content (locally, aka to your computer / internal network only). To view your webpage, open a browser and navigate to  http://localhost:3000. 

### Deploying your Site to Github

The above section "Quick Start" shows you how to get this starter kit cloned and running locally for development and testing; in this section we are going to cover how to publish your own version of this code to your own Github repository. If you haven't already, please create an account with Github and setup a new (empty) repository before continuing. 

The first thing we need to do is remove the current "remote" from the project. "Remotes" are simply external addresses that are registered with the package that tell the code where to be published. The default remote for this package is called "origin", so we are going to enter a command into a terminal that instructs this git package to remove the remote title "origin". Open a command line terminal and navigate to the project's folder, then enter the following command:

```shell
git remote rm origin
```

Next we need to create a new remote that points to your empty Github project (again, if you haven't already created a repository, please do so now). In your empty Github repository, you should see some quick-start command-line blocks; locate the section titled **'…or push an existing repository from the command line'**, it should look something like this:

```shell
git remote add origin https://github.com/your-account-name/your-repository-name.git
git push -u origin master
```

Enter the provided commands into the command line terminal from the previous step. Go back to your web browser and refresh the Github repositories webpage; you should see all your code is now there. Congratulations, you now have a github repository in the cloud that you can publish your code to at any point in time. 

#### *Note:

Whenever you make changes in the future you will need to you through a simple 3 step process to publish your code to the repository. First, once all code changes are complete, you will need to "stage" the changes. Then, once the changes are staged, you will need to commit them. And finally, you will need to publish your commit to the Github repository. This can be accomplished with 3 command line commands:

```shell
git add .
git commit -m "some notes about the changes"
git push origin master
```

Keep in mind, git and Github are not the same thing. Github is a service that is built on top of git; git is a very powerful application that is available for any operating system and is the worlds #1 open-source repository solution. There are a million things git is capable of doing and I highly recommend spending a few hours reading through tutorials on how to best leverage your git repositories and services. Entire Master-Level courses could be taught on git and it still would only scratch the surface of all it capabilities; but don't let this scare you, it is VERY easy to get started with git and you can learn as you go along and new necessities arise. 

One important thing to understand is that every place your source is stored with git (local, remote, etc) has a complete copy of the entire history of the repository. You might be thinking to yourself "That must be a HUGE file", but you would in-fact be wrong. Git uses sophisticated graph-theory constructs to denote the most minimal changes made to a file, then removes any additional "noise". Git also performs special optimizations at various phases of the repositories lifecycle, helping guarantee a small reference structure.