/**
 * 商城系统
 */
export default {
    saveUser(state, user) {
        state.user = user;
    },
    setIndexProductId(state, indexProductId) {
        state.indexProductId = indexProductId;
    },
}