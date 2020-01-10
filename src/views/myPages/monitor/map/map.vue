<template>
  <div style="width:100%;height：100%">
    <PageView :title="false">
      <template #headerContent>
        <span>设备分组：</span>
        <a-select style="width: 160px" placeholder="请选择分组" @change="handleChange">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
      </template>
      <template slot="extra">
        <a-pagination :defaultCurrent="1" :total="500" />
      </template>
    </PageView>

    <el-amap vid="amapDemo" :zoom="zoom" :plugin="plugin" :center="center" class="map">
      <!-- <template v-for="(item,index) in teaSubscribeInfo">
      <el-amap-marker
        :position="[parseFloat(item.longitude),parseFloat(item.latitude)]"
        :key="index"
        :label="{content:item.name,offset: [-60, -25]}"
        :events="events"
        :extData="item"
      ></el-amap-marker>
      </template>-->
    </el-amap>
 
    
  </div>
</template>

<script>
import PageView from '@/layouts/PageView'
import VueAMap from 'vue-amap'
VueAMap.initAMapApiLoader({
  key: '23a9ece5a475725cf1a4b1cda321e6ce',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation'
  ],
  v: '1.4.4'
})
export default {
  data() {
    return {
      zoom: 11,
      active: false,
      center: [121.5273285, 31.21515044],

      // label: {
      //   content: "武夷山镇篁村",
      //   offset: [0, 0]
      // },
      events: {
        // click: (item, e) => {
        //   this.$router.push({
        //     path: "/home/detail",
        //     query: { id: item.target.F.extData.teaId }
        //   });
        // }
      },
      // eventsmap: {
      //   mousewheel: (item) => {
      //     console.log(item);
      //   }
      // },
      plugin: [
        {
          pName: 'ToolBar', //工具条插件
          position: 'LT'
        },
        {
          pName: 'Geolocation',
          showMarker: true,
          buttonPosition: 'RB',
          events: {
            init: o => {
              //定位成功 自动将marker和circle移到定位点
              o.getCurrentPosition((status, result) => {
                // console.log(result);
                if (result && result.position) {
                  self.center = [result.position.lng, result.position.lat];
                  // this.longitude =result.position.lng
                  // this.latitude = result.position.lat
                  console.log([result.position.lng,result.position.lat])
                  this.getOneselfPosition([result.position.lng, result.position.lat])
                  // console.log(this.longitude)
                  self.loaded = true;
                } else {
                  console.log(`定位失败`)
                }
              })
              // console.log(o);
            }
          }
        }
      ]
    }
  },

  computed: {},

  mounted() {},

  methods: {
    handleChange() {}
  },

  components: {
    PageView
  }
}
</script>
<style lang='less' scoped>

.map {
  text-align: center;
  margin:-24px -24px;
  width:auto;
  height: 720px;
  /deep/ .window-text div {
    border-radius: 4px;
  }

}
</style>