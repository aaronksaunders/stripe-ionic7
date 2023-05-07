import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import StripeCheckoutButton from '../components/StripeCheckoutButton';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Stripe Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
<StripeCheckoutButton />
      </IonContent>
    </IonPage>
  );
};

export default Home;
