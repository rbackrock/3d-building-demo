<script setup>
</script>

<template>
  <div id="machine-core-label-hook" class="machine-label-container">
    <div class="three-label-container-wrapper">
      <div class="title-container">
        <div class="title-container-wrapper">
          <div class="room-id"># 机器</div>
          <div class="room-name">核心</div>
        </div>
      </div>
      <div class="icon-container">
        <div class="icon-container-wrapper">
          <div class="fan-container">
            <div class="fan-part1"></div>
            <div class="fan-part2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="machine-shell-label-hook" class="machine-label-container">
    <div class="three-label-container-wrapper">
      <div class="title-container">
        <div class="title-container-wrapper">
          <div class="room-id"># 机器</div>
          <div class="room-name">外壳</div>
        </div>
      </div>
      <div class="icon-container">
        <div class="icon-container-wrapper">
          <div class="fan-container">
            <div class="fan-part1"></div>
            <div class="fan-part2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="machine-base-label-hook" class="machine-label-container">
    <div class="three-label-container-wrapper">
      <div class="title-container">
        <div class="title-container-wrapper">
          <div class="room-id"># 机器</div>
          <div class="room-name">基座</div>
        </div>
      </div>
      <div class="icon-container">
        <div class="icon-container-wrapper">
          <div class="fan-container">
            <div class="fan-part1"></div>
            <div class="fan-part2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .machine-label-container {
    width: 200px;
    // height: 100%;
    color: #00deff;
    display: none;
    cursor: pointer;

    &.visible {
      display: block;
    }

    .three-label-container-wrapper {
      width: 100%;
      height: 100%;

      .title-container {
        background-image: url('/3d/images/label/text-box.svg#svgView(preserveAspectRatio(none))');
        background-repeat: no-repeat;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;

        .title-container-wrapper {
          text-align: center;
          pointer-events: all;
          cursor: pointer;

          .room-id {
            padding: 2% 0 0 0;
            font-size: 1.4em;
          }

          .room-name {
            font-size: 1.2em;
            padding: 2% 0 5% 0;
          }
        }
      }

      .icon-container {
        .icon-container-wrapper {
          position: relative;

          .fan-container {
            .fan-part1 {
              width: 60px;
              height: 60px;
              margin: 0 auto;
              background-image: url('/3d/images/label/fan-part1.svg#svgView(preserveAspectRatio(none))');
              background-repeat: no-repeat;
              background-repeat: no-repeat;
              background-position: center;
              background-size: 100% 100%;
              animation: fan-rotate 1.3s infinite;
              animation-fill-mode: forwards;
              animation-timing-function: linear;
            }
          }

          .cctv-container {
            position: absolute;
            top: 0;
            right: 0;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .cctv-wrapper {
              width: 40px;
              height: 40px;
              // margin: 0 auto;
              background-image: url('/3d/images/label/cctv.svg#svgView(preserveAspectRatio(none))');
              background-repeat: no-repeat;
              background-repeat: no-repeat;
              background-position: center;
              background-size: 100% 100%;
              pointer-events: all;
              cursor: pointer;
            }
            
          }
        }
      }
    }
  }
</style>
