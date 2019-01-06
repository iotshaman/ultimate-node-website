

A simple website starter kit, built with SEO (Seach Engine Optimization) in mind. This starter kit is built on top of Node Js / Express / Shaman Website Compiler, and was designed to give small website developers and hobbyists access to blazing speeds, advanced caching and compression, built-in templating, asset minification, and more! This project is maintained by [IoT Shaman](https://www.iotshaman.com) and has a complimentary tutorial on how to host your own website in the cloud, for free. [Click here](https://www.iotshaman.com/blog/content/how-to-host-your-website-for-free-in-5-easy-steps) to read the small blog article and learn how to setup your own website in 5 easy steps. 

### Requirements

In order to download and run this package you will need the following resource(s):

- git
- npm

### Quick Start

The first thing you need to do is clone this repository. Open a command line terminal and navigate to the folder you want to download the package to; then enter the following commands:

```shell
git clone https://github.com/iotshaman/ultimate-node-website.git
cd ultimate-node-website
```

The first command will download the package and the second command will navigate into the newly created package folder. 

Next we want to install the package dependencies so we can test our application locally. In the same command terminal, enter the following command:

```shell
npm install
```

Now all we need to do to verify everything is working properly is to start the application locally. In the same terminal, enter the following command:

```shell
npm start
```

You should see some command line output, and somewhere in there it should say 'Application available at port: 3000'. This means that a Node Js server is now running locally on your computer and is available to serve your website's content (locally, aka to your computer / internal network only). To view your webpage, open a browser and navigate to  http://localhost:3000. 

### Deploying your Site to Github

The above section "Quick Start" shows you how to get this starter kit cloned and running locally for development and testing; in this section we are going to cover how to publish your own version of this code to your own Github repository. If you haven't already, please create an account with Github and setup a new (empty) repository before continuing. 

The first thing we need to do is remove the current "remote" from the project. "Remotes" are simply external addresses that are registered with the package that tell the code where to be published. The default remote for this package is called "origin", so we are going to enter a command into a terminal that instructs this git package to remove the remote titled "origin". Open a command line terminal and navigate to the project's folder, then enter the following command:

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

Whenever you make changes in the future you will need to follow a simple 3 step process to publish your code to the repository. First, once all code changes are complete, you will need to "stage" the changes. Then, once the changes are staged, you will need to commit them. And finally, you will need to publish your commit to the Github repository. This can be accomplished with 3 terminal commands:

```shell
git add .
git commit -m "some notes about the changes"
git push origin master
```

Keep in mind, Github and git are not the same thing. Github is a service (a VERY reliable one at that) that is built on top of git; git is a very powerful application that is available for any operating system and is the worlds #1 open-source repository solution. There are a million things git is capable of doing, and I highly recommend spending a few hours reading through tutorials on how to best leverage your git repositories and services. Entire masters-level courses could be taught on git and it still would only scratch the surface of all it's capabilities; but don't let this scare you, it is VERY easy to get started with git and you can learn as you go along and new necessities arise. 

One important thing to understand is that every place your source is stored with git (local, remote, etc) has a complete copy of the entire history of the repository. You might be thinking to yourself "That must be a HUGE file", but you would in-fact be wrong. Git uses sophisticated graph-theory constructs to denote the most minimal changes made to a file, then removes any additional "noise". Git also performs special optimizations at various phases of the repositories lifecycle, helping guarantee a small reference structure.

### Additional Resources

The below section aims to provide some additional help for people who are just beginning to learn website development. If you are already comfortable with web development techniques and Node Js you can skip this project and instead begin looking at the code directly.

### Shaman Website Compiler

This application uses [Shaman Website Compiler](https://github.com/iotshaman/shaman-website-compiler) for its view provider, template engine, caching mechanisms, routing strategy and more. This allows you, the developer, to focus on generating content and not worry about the underlying server technology. However, it can be very helpful to familiarize yourself with the compiler in order to avoid frustrating errors in the future.

##### View Provider

Configuration for the Shaman Website Compiler can be found in the file 'providers/view-provider.js'. Please visit the compiler's github project for the specifics on how to modify this configuration to your needs.

##### Templating stategy

The built-in template engine is based off an existing template engine called [Handlebars](https://handlebarsjs.com/), which I highly recommend you spend a few minutes reading about before contiuing. Handlebars is very minimialistic and can be learned in a very short period of time. 

If you open the file 'views/index.html' you will notice the header element looks like this:

```html
<head>
    {{> partials/meta/common-tags.partial.html }}
    {{> partials/meta/meta-props.partial.html }}
    {{{bundles model.shaman.bundles}}}
    {{> partials/meta/font-awesome.partial.html }}
    {{> partials/meta/google-analytics.partial.html }}
</head>
```

This is a great example of how Shaman Website Compiler leverages Handlebars. 4 of the 5 tags are partial files that you can edit yourself, and can be found in the folder 'src/partials/'. The third tag from the top is an example of a tag that is built-in to Shaman Website Compiler; the compiler has certain optimizations built-in that allow developers to forget about the small things like script inclusion and minification and forcus on generating content. If you need more control over your header tags then you can simply delete this section and manually include any assets. 

Another thing you might notice about the starter kit is that each HTML file in the folder 'arc/views' has a corresponding JSON file. These JSON files are automatically located by the compiler based on the file-names (must match!) and the data is injected into the template when it is compiling; this allows us to generate dynamic content based on the values provided in the JSON files. Below is a snippet from the file 'views/index.html', followed by a snippet of the file 'views/index.json':

```html
...
    <h2>{{ model.sectionTitle }}</h2>
    <p>
        {{{ model.sectionBody }}}
    </p>
...
```

```javascript
{
    // ...
    "sectionTitle": "Ultimate Node Website",
    "sectionBody": "Welcome to your very own website..."
}
```

When the server is started and the templates are compiled, the server will then return the following value when the page is requested:

```html
...
    <h2>Ultimate Node Website</h2>
    <p>
        Welcome to your very own
    </p>
...
```

The template engine can handle any JSON property type; for example, this is how you would loop through an array of strings:

```js
{
  "stringVals": ['string1', 'string2']
}
```
```html
<ul>
  {{#each stringVals}}
    <li>{{this}}</li>
  {{/each}}
</ul>
```

#### Auto compile / caching

When you are running your application server locally you will notice that the command line says "updating express routes" whenever you change an HTML file. This allows you to start your server locally, begin making changes to the files, and be able to view those changes without having to restart the computer. This will only work for HTML files that already existed when the server was started, so if you add any new files you will still need to restart the server. 

the server also, by default, tells the browser to cache the files so it saves time loading the webpage in the future. This can cause some annoying issues when testing changes, so when you are testing locally make sure to turn off your browsers caching. This can be done in Chrome by clicking f12, going to the Network tab, and clicking 'Disable Cache'.