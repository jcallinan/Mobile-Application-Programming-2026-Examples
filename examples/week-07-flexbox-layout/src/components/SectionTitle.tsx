import { StyleSheet, Text } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: Props) {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#94a3b8',
    marginTop: 4,
    lineHeight: 20,
  },
});
