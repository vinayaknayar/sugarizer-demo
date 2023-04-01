<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b6ccfe;
  width: 100%;
  margin: 0;
  padding: 0;
}

nav {
  padding: 30px;
  gap: 30px;
}

nav a {
  margin: 50px;
  font-weight: bold;
  color: #788bff;
}

nav a.router-link-exact-active {
  color: #5465ff;
}
body{
  margin: 0;
  padding: 0;
  /* min-width: 100%; */
  /* justify-self:  */

  background-color: rgb(13, 13, 13);
}
</style>
