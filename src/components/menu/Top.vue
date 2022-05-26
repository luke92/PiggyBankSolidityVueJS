<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{name: 'home'}">
      PiggyBank
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'about'}">
            About
          </router-link>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <button class="btn btn-success my-2 my-sm-0" type="button">
          0x123...abcd
        </button>
        <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="connect">
          Connect
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Top',
  data() {
    return {
      error: null,
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    ...mapGetters({
      isLogged: constants.SESSION_IS_LOGGED,
    }),
    accountShort() {
      return `${this.account.slice(0, 6)}...${this.account.slice(-5)}`;
    },
  },
  methods: {
    ...mapActions({
      connectToWeb3: constants.SESSION_CONNECT_WEB3,
    }),
    async connect() {
      try {
        // eslint-disable-next-line no-undef
        await ethereum.enable();
      } catch (e) {
        this.error = e;
      }
      this.connectToWeb3();
    },
  },
};
</script>
