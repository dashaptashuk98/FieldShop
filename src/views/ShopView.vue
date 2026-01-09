<template>
  <header>
    <div class="container">
      <nav class="navbar">
        <div class="navbar-menu">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/my-plot" class="nav-link">My plots</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contacts" class="nav-link">Contacts</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/shop" class="nav-link">Shop</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/wallet" class="nav-link">Wallet</router-link>
            </li>
          </ul>
        </div>
        <div class="user-basket">
          <img class="user-basket__bag" src="../assets/images/Icon.svg" alt="" />
          <span class="user-basket__number">0</span>
        </div>
        <div class="user-section">
          <div class="user-avatar">
            <img
              src="../assets/images/6786bf8ee56da6f5759fbc498844a60864be656a.jpg"
              alt=""
              class="avatar-img"
            />
          </div>
          <img class="user-info" src="../assets/images/Vector.svg" alt="" />
        </div>
      </nav>
    </div>
  </header>
</template>

<script></script>

<style></style>
