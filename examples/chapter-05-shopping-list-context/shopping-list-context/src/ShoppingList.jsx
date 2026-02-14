import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  UIManager,
  View,
} from 'react-native';
import { useShoppingList } from './context/ShoppingListContext';

const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];
const CATEGORY_OPTIONS = ['General', 'Produce', 'Dairy', 'Bakery', 'Household'];

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function ShoppingList({ listId = 'default', title = 'Shopping List' }) {
  const { getItems, addItem, toggleItem } = useShoppingList();
  const items = getItems(listId);

  const [label, setLabel] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(PRIORITY_OPTIONS[1]);
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [quantity, setQuantity] = useState('1');
  const [notes, setNotes] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [showUiModal, setShowUiModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const addScaleAnim = useRef(new Animated.Value(1)).current;

  const completedCount = items.filter((item) => item.purchased).length;
  const completionRatio = items.length ? completedCount / items.length : 0;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: completionRatio,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [completionRatio, progressAnim]);

  const onSubmit = () => {
    if (!label.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      addItem(
        {
          label: label.trim(),
          dueDate: dueDate.trim(),
          priority,
          category,
          quantity: Number.parseInt(quantity, 10) || 1,
          notes: notes.trim(),
        },
        listId
      );

      setLabel('');
      setDueDate('');
      setPriority(PRIORITY_OPTIONS[1]);
      setCategory(CATEGORY_OPTIONS[0]);
      setQuantity('1');
      setNotes('');
      setShowPriorityDropdown(false);
      setIsSubmitting(false);
    }, 320);
  };

  const onToggleItem = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleItem(id, listId);
  };

  const visibleItems = useMemo(
    () =>
      items.filter((item) => {
        if (activeFilter === 'open' && item.purchased) {
          return false;
        }

        if (activeFilter === 'done' && !item.purchased) {
          return false;
        }

        if (showUrgentOnly && item.priority !== 'Urgent') {
          return false;
        }

        return true;
      }),
    [activeFilter, items, showUrgentOnly]
  );

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.heading}>{title}</Text>
        <Pressable style={styles.uiButton} onPress={() => setShowUiModal(true)}>
          <Text style={styles.uiButtonText}>UI demo</Text>
        </Pressable>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total</Text>
          <Text style={styles.metricValue}>{items.length}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Purchased</Text>
          <Text style={styles.metricValue}>{completedCount}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      <View style={styles.formSection}>
        <TextInput
          value={label}
          placeholder="Item name"
          onChangeText={setLabel}
          style={styles.input}
          returnKeyType="next"
        />

        <View style={styles.row}>
          <TextInput
            value={dueDate}
            placeholder="Due date (YYYY-MM-DD)"
            onChangeText={setDueDate}
            style={[styles.input, styles.flexInput]}
          />
          <TextInput
            value={quantity}
            placeholder="Qty"
            onChangeText={setQuantity}
            keyboardType="number-pad"
            style={[styles.input, styles.smallInput]}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.dropdownContainer}>
            <Text style={styles.fieldLabel}>Priority</Text>
            <Pressable
              style={styles.dropdownButton}
              onPress={() => setShowPriorityDropdown((prev) => !prev)}
            >
              <Text style={styles.dropdownButtonText}>{priority}</Text>
              <Text style={styles.dropdownButtonText}>▾</Text>
            </Pressable>
            {showPriorityDropdown && (
              <View style={styles.dropdownMenu}>
                {PRIORITY_OPTIONS.map((option) => (
                  <Pressable
                    key={option}
                    onPress={() => {
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                      setPriority(option);
                      setShowPriorityDropdown(false);
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.dropdownItemText}>{option}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.categoryChips}>
              {CATEGORY_OPTIONS.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setCategory(option)}
                  style={[styles.chip, category === option && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, category === option && styles.chipTextSelected]}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <TextInput
          value={notes}
          placeholder="Notes (brand, aisle, alternatives...)"
          onChangeText={setNotes}
          multiline
          style={[styles.input, styles.textArea]}
        />

        <Animated.View style={{ transform: [{ scale: addScaleAnim }] }}>
          <Pressable
            style={[styles.addButton, isSubmitting && styles.addButtonDisabled]}
            onPress={onSubmit}
            onPressIn={() => {
              Animated.spring(addScaleAnim, {
                toValue: 0.97,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.spring(addScaleAnim, {
                toValue: 1,
                friction: 5,
                useNativeDriver: true,
              }).start();
            }}
          >
            {isSubmitting ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.addButtonText}>Saving item...</Text>
              </View>
            ) : (
              <Text style={styles.addButtonText}>Add item with details</Text>
            )}
          </Pressable>
        </Animated.View>
      </View>

      <View style={styles.filterRowBetween}>
        <View style={styles.filterRow}>
          {[
            { key: 'all', label: 'All' },
            { key: 'open', label: 'Open' },
            { key: 'done', label: 'Done' },
          ].map((filter) => (
            <Pressable
              key={filter.key}
              onPress={() => setActiveFilter(filter.key)}
              style={[
                styles.filterPill,
                activeFilter === filter.key && styles.filterPillActive,
              ]}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === filter.key && styles.filterPillTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Urgent only</Text>
          <Switch value={showUrgentOnly} onValueChange={setShowUrgentOnly} />
        </View>
      </View>

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items match the current filters.</Text>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => onToggleItem(item.id)} style={styles.itemCard}>
            <View style={styles.itemMainRow}>
              <Text style={[styles.checkbox, item.purchased && styles.checkboxChecked]}>
                {item.purchased ? '☑' : '☐'}
              </Text>
              <View style={styles.itemTextGroup}>
                <Text style={[styles.itemText, item.purchased && styles.itemTextDone]}>
                  {item.label}
                </Text>
                <Text style={styles.itemSubText}>
                  Qty: {item.quantity} • {item.category}
                </Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.priority}</Text>
              </View>
            </View>

            {(item.dueDate || item.notes) && (
              <View style={styles.itemMetaSection}>
                {item.dueDate ? <Text style={styles.metaText}>Due: {item.dueDate}</Text> : null}
                {item.notes ? <Text style={styles.metaText}>Notes: {item.notes}</Text> : null}
              </View>
            )}
          </Pressable>
        )}
      />

      <Modal visible={showUiModal} transparent animationType="slide" onRequestClose={() => setShowUiModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>UI component playground</Text>
            <Text style={styles.modalBody}>
              This screen now showcases: Animated progress bars, loading indicators, switches,
              chips, pill filters, dropdown menus, modal dialogs, and card-based list rows.
            </Text>
            <Pressable style={styles.modalButton} onPress={() => setShowUiModal(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
  },
  uiButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#eef4ff',
  },
  uiButtonText: {
    color: '#1f6feb',
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  metricCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
  },
  metricLabel: {
    fontSize: 12,
    color: '#57606a',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#e6ebf1',
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1f6feb',
  },
  formSection: {
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  flexInput: {
    flex: 1,
  },
  smallInput: {
    width: 90,
  },
  dropdownContainer: {
    flex: 1,
    gap: 4,
  },
  fieldLabel: {
    fontSize: 12,
    color: '#57606a',
    fontWeight: '600',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 15,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f4',
  },
  dropdownItemText: {
    fontSize: 14,
  },
  categoryChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  chipSelected: {
    backgroundColor: '#1f6feb',
    borderColor: '#1f6feb',
  },
  chipText: {
    fontSize: 12,
    color: '#2f363d',
  },
  chipTextSelected: {
    color: '#fff',
  },
  textArea: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.85,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterRowBetween: {
    marginTop: 14,
    marginBottom: 6,
    gap: 10,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterPillActive: {
    backgroundColor: '#1f6feb',
    borderColor: '#1f6feb',
  },
  filterPillText: {
    color: '#2f363d',
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  switchLabel: {
    color: '#2f363d',
    fontWeight: '600',
  },
  list: {
    paddingTop: 8,
    paddingBottom: 20,
    gap: 10,
  },
  emptyText: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 10,
    color: '#57606a',
  },
  itemCard: {
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    fontSize: 20,
    marginRight: 10,
    color: '#57606a',
  },
  checkboxChecked: {
    color: '#1a7f37',
  },
  itemTextGroup: {
    flex: 1,
  },
  itemText: {
    fontSize: 17,
    fontWeight: '600',
  },
  itemSubText: {
    marginTop: 2,
    fontSize: 12,
    color: '#57606a',
  },
  itemTextDone: {
    textDecorationLine: 'line-through',
    color: '#57606a',
  },
  badge: {
    backgroundColor: '#e6f0ff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  badgeText: {
    color: '#1f6feb',
    fontSize: 12,
    fontWeight: '600',
  },
  itemMetaSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f2f4',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#57606a',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalBody: {
    color: '#57606a',
    lineHeight: 20,
  },
  modalButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
