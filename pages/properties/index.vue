<template>
  <v-main class="mx-2 my-0">
    <div class="d-flex flex-grow-1 justify-space-between">
      <div class="justify-start">
        <LeftBar />
      </div>
      <div style="width: 100%;" class="mx-3">
        <div style="height: 64px;" @click="chTtopPanel()">
          <component :is="topPanel" />
        </div>
        <v-card>
          <lgTabsBlock />
          <lgMainBlock />
          <lgSabContentBlock />
        </v-card>
      </div>
      <div class="d-flex justify-end">
        <RightBar />
      </div>
    </div>
  </v-main>
</template>
<script>

export default {
  transition: 'bounce',
  layout: 'user.layout',
  components: {
    LeftBar: () => import('@/components/LeftBar/LeftBar'),
    breadСrumbs: () => import('@/components/breadСrumbs'),
    messagePanel: () => import('@/components/messagePanel.vue'),
    lgMainBlock: () => import('@/components/user/lg-main-block'),
    lgTabsBlock: () => import('@/components/user/lg-tabs-block'),
    lgSabContentBlock: () => import('@/components/user/lg-sub-content-block'),
    RightBar: () => import('@/components/LeftBar/RightBar')
  },
  data: () => ({
    component: 'sectionsAndGroupsMain',
    topPanel: 'breadСrumbs',
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard',
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2',
      },
    ],
  }),
  methods: {
    chTtopPanel () {
      if (this.topPanel === 'breadСrumbs') {
        this.topPanel = 'messagePanel'
      } else {
        this.topPanel = 'breadСrumbs'
      }
    }
  }
}
</script>
