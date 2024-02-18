import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { User } from '../models/user';

export interface State {
    user: User;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        user: null
    },
    mutations: {
        addUser(state, {user}) {
            state.user = user;
        },
        removeUser(state) {
            state.user = null;
        }
    },
    getters: {
        getCurrentUser(state) {
            return state.user;
        }
    }
});
