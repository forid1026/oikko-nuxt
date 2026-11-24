<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main" class="skip-link">মূল অংশে যান</a>
    <!-- পেজ বদলানোর সময় উপরে সরু progress রেখা -->
    <NuxtLoadingIndicator color="#2aa7e0" :height="3" />
    <SiteHeader />
    <main id="main" tabindex="-1" class="flex-1 outline-none">
      <slot />
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
</template>
