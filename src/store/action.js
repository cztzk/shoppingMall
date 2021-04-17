/**
 * 商城系统
 */
export default {
    saveUser(context, user) {
      context.commit('saveUser', user);
    },
}