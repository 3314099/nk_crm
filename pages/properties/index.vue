<template>
  <v-main class="mx-2 my-0">
    <div class="d-flex flex-grow-1 justify-space-between">
      <div class="justify-start">
        <LBPanelButtons />
      </div>
      <div style="width: 100%;" class="mx-3">
        <div style="height: 64px;">
          <infoPanel />
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
    infoPanel: () => import('@/components/infoPanel/infoPanel'),
    lgTabsBlock: () => import('@/components/user/lg-tabs-block'),
    lgTabContentBlock: () => import('@/components/user/lg-tab-content-block'),
    lgSubContentBlock: () => import('@/components/user/lg-sub-content-block'),
    LBcrm: () => import('@/components/testLeftBars/LBcrm')
  },
}
</script>
