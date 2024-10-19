<template>
  <aside class="sidebar">
    <nav>

    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AdminSidebar'
};
</script>

<style scoped>
.sidebar {
  background-color: #002c5f;
  color: white;
  padding: 2rem;
  font-size: 1.2rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 1.5rem;
}

.sidebar ul li a {
  color: #c5cae9;
  text-decoration: none;
  font-weight: bold;
}

.sidebar ul li a:hover {
  color: white;
}
</style>
