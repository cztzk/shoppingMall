<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    box-sizing: border-box;
}

#app {
    max-width: 100vw;
    font-family: "Microsoft YaHei", Menlo, Monaco, Consolas, "Courier New", monospace;
}

a {
    color: #282828;
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    line-height: 1.4;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
}

pre {
    word-break: break-all;
    white-space: break-spaces;
}

h6 {
    font-size: 10px;
}

h5 {
    font-size: 12px;
}

h4 {
     font-size: 14px;
}

h3 {
    font-size: 16px;
}

h2 {
     font-size: 18px;
}

h1 {
     font-size: 20px;
}

p {
    font-size: 16px;
    line-height: 1.6;
}



ul,
ol,
li {
    list-style: none;
}

.text-center {
    text-align: center;
}

.text-left {
    text-align: left;
}

.text-right {
    text-align: right;
}

.floatleft {
    float: left;
}

.floatright {
    float: right;
}

.clearfix {
    display: block;
    content: "";
    clear: both
}



img[src=''] {
    display: none;
}

.opacity0 {
    opacity: 0 !important;
}

.hidden {
    display: none;
    overflow: hidden;
    height: 0;
}

</style>
