import { useUserStore } from '@/stores/users';

export default function (context) {
  const userStore = useUserStore();
  
  if (!userStore.user.isAuthenticated || !userStore.user.isStaff) {
    return context.redirect('/');
  }
}