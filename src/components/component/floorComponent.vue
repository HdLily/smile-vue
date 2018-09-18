<template>
    <div>
        <div class="floor">
            <div class="floor-title">{{floorTitle}}</div>
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img :src="floorData0.image" width="100%">
                </div>
                <div class="floor-three">
                    <div class="floor-two">
                        <img :src="floorData1.image" width="100%">
                    </div>
                    <div>
                        <img :src="floorData2.image" width="100%">
                    </div>
                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item, index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" width="100%">
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    props: ['floorData', 'floorTitle'],
    data () {
        return {
            floorData0: {},
            floorData1: {},
            floorData2: {}
        }
    },
    created() {

    },
    watch: {
        floorData: function (val) {
            console.log(this.floorData);
            this.floorData0 = this.floorData[0];
            this.floorData1 = this.floorData[1]
            this.floorData2 = this.floorData[2]
        }
    }
}
</script>

<style scoped>
    .floor {
        width: 100%;
        
    }
    .floor-title{
        text-align: center;
        font-size:24px;
        height:3rem;
        line-height: 3rem;
        border-bottom: 1px solid #ddd;
    }
    .floor-anomaly{
        /* font-size: 14px; */
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: #fff;
        border-bottom:1px solid #ddd;
    }
    .floor-anomaly div{
        /* width:10rem; */
        box-sizing:border-box;
        -webkit-box-sizing: border-box;
    }
    .floor-one{
        width: 50%;
        border-right:1px solid #ddd;
    }
    .floor-three {
        width: 50%;
    }
    .floor-two{
        border-bottom:1px solid #ddd;
    }
    .floor-rule{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        background-color: #fff;
    }
    .floor-rule div{
        -webkit-box-sizing:border-box;
        box-sizing:border-box;
        width:50%;
        border-bottom:1px solid #ddd;
    }
    .floor-rule div:nth-child(odd){
        border-right:1px solid #ddd;
    }
</style>
