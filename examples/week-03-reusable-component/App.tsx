import { StyleSheet, Text, View } from 'react-native';

type InfoCardProps = {
  title: string;
  detail: string;
};

function InfoCard({ title, detail }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDetail}>{detail}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reusable Cards</Text>
      <InfoCard title="Lecture" detail="Props make components flexible." />
      <InfoCard title="Lab" detail="Reuse the same card for each task." />
      <InfoCard title="Homework" detail="Swap data without touching layout." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDetail: {
    color: '#475569',
  },
});
