import { redirect } from 'next/navigation';
import { getUserSession } from '@/shared/lib/get-user-session';

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return redirect('/not-auth');
  }

  return <div>It's your Profile</div>;
}
