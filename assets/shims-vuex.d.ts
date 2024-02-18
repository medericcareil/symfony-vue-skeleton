//shims-vuex.d.ts
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { User } from './core/models/user';

declare module '@vue/runtime-core' {
    interface State {
        user: User;
    }

    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
