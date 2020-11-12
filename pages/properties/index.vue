<template>
  <v-main class="mx-2 my-0">
    <div class="d-flex flex-grow-1 justify-space-between">
      <div class="justify-start">
        <LBPanelButtons />
      </div>
      <div style="width: 100%;" class="mx-3">
        <div style="height: 64px;" @click="chTtopPanel()">
          <component :is="topPanel" />
        </div>
      </div>
      <div class="justify-start">
        <LBPanelButtons />
      </div>
    </div>
    <div class="d-flex justify-end">
      <div
        style="width: 100%;"
      >
        <v-card
          class="pa-2"
        >
          <lgTabsBlock />
          <lgTabContentBlock />
          <lgSubContentBlock />
        </v-card>
      </div>
      <div>
        <LBcrm />
      </div>
    </div>
  </v-main>
</template>
<script>

export default {
  transition: 'bounce',
  layout: 'user.layout',
  components: {
    LBPanelButtons: () => import('@/components/LeftBar/LBPanelButtons'),
    breadСrumbs: () => import('@/components/breadСrumbs'),
    messagePanel: () => import('@/components/messagePanel.vue'),
    RightBar: () => import('@/components/LeftBar/RightBar'),
    lgTabsBlock: () => import('@/components/user/lg-tabs-block'),
    lgTabContentBlock: () => import('@/components/user/lg-tab-content-block'),
    lgSubContentBlock: () => import('@/components/user/lg-sub-content-block'),
    LBcrm: () => import('@/components/testLeftBars/LBcrm')
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
