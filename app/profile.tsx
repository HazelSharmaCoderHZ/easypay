import { useTheme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Profile() {
  const { colors, fonts } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'student' | 'vendor' | 'admin'>('student');

  /* ✅ Email Validation */
  const validStudent =
    role !== 'student' || email.endsWith('@vitstudent.ac.in');

  return (
    <LinearGradient
      colors={['#0f172a', '#1e1b4b', '#312e81']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ================= Header ================= */}

        <Text style={styles.pageTitle}>Student Profile</Text>

        {/* ================= Profile Card ================= */}

        <View style={styles.profileCard}>

          <Image
            source={{
              uri: 'https://i.pravatar.cc/200',
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {name || 'Your Name'}
          </Text>

          <Text style={styles.subtitle}>
            {role.toUpperCase()}
          </Text>

        </View>

        {/* ================= Form ================= */}

        <View style={styles.form}>

          <Input
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />

          <Input
            placeholder="Email ID"
            value={email}
            onChangeText={setEmail}
          />

          {!validStudent && (
            <Text style={styles.error}>
              Student email must end with @vitstudent.ac.in
            </Text>
          )}

        </View>

        {/* ================= Role Selector ================= */}

        <Text style={styles.sectionTitle}>
          Select Role
        </Text>

        <View style={styles.roleRow}>

          <RoleButton
            label="Student"
            active={role === 'student'}
            onPress={() => setRole('student')}
          />

          <RoleButton
            label="Vendor"
            active={role === 'vendor'}
            onPress={() => setRole('vendor')}
          />

          <RoleButton
            label="Admin"
            active={role === 'admin'}
            onPress={() => setRole('admin')}
          />

        </View>

        {/* ================= Stats ================= */}

        <View style={styles.statsRow}>

          <StatCard title="Meals" value="45" />
          <StatCard title="Limit" value="₹2000" />
          <StatCard title="Days" value="12" />

        </View>

        {/* ================= Settings ================= */}

        <View style={styles.settings}>

          <SettingItem text="Security & PIN" />
          <SettingItem text="Set Spending Limits" />
          <SettingItem text="Transaction History" />
          <SettingItem text="Help & Support" />

        </View>

        {/* ================= Logout ================= */}

        <Pressable style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

      </ScrollView>
    </LinearGradient>
  );
}

/* ================= Reusable Components ================= */

function Input({ placeholder, value, onChangeText }: any) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
      value={value}
      onChangeText={onChangeText}
    />
  );
}

function RoleButton({ label, active, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.roleBtn,
        active && styles.roleActive,
      ]}
    >
      <Text
        style={[
          styles.roleText,
          active && styles.roleTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function StatCard({ title, value }: any) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function SettingItem({ text }: any) {
  return (
    <Pressable style={styles.settingItem}>
      <Text style={styles.settingText}>{text}</Text>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

/* ================= Styles ================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  pageTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },

  /* Profile Card */

  profileCard: {
    backgroundColor: '#020617',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#312e81',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#6366f1',
  },

  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  subtitle: {
    color: '#a5b4fc',
    fontSize: 13,
    marginTop: 2,
  },

  /* Form */

  form: {
    marginBottom: 15,
  },

  input: {
    backgroundColor: '#020617',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 12,
  },

  error: {
    color: '#f87171',
    fontSize: 12,
    marginBottom: 10,
  },

  /* Roles */

  sectionTitle: {
    color: '#c7d2fe',
    fontSize: 15,
    marginBottom: 8,
  },

  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  roleBtn: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#312e81',
    alignItems: 'center',
  },

  roleActive: {
    backgroundColor: '#6366f1',
  },

  roleText: {
    color: '#c7d2fe',
  },

  roleTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  /* Stats */

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#312e81',
  },

  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  statTitle: {
    color: '#a5b4fc',
    fontSize: 12,
    marginTop: 4,
  },

  /* Settings */

  settings: {
    marginBottom: 25,
  },

  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#020617',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  settingText: {
    color: '#e0e7ff',
    fontSize: 14,
  },

  arrow: {
    color: '#6366f1',
    fontSize: 18,
  },

  /* Logout */

  logoutBtn: {
    backgroundColor: '#7f1d1d',
    padding: 14,
    borderRadius: 10,
    marginBottom: 40,
  },

  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
