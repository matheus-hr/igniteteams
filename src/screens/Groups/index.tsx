import { useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Loading } from '@components/Loading';
import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { groupsGetAll } from '@storage/group/groupsGetAll';

export function Groups() {

  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [groups, setGroups] = useState<string[]>([]);

  function handleNewGroup(){
    navigation.navigate('new')
  }

  async function fetchGroups(){
    try {
      setIsLoading(true);

      const data = await groupsGetAll();

      setGroups(data);
      setIsLoading(false);

    } catch (error) {
      console.log(error)
      Alert.alert("Turmas", "Não foi possivel carregar as turmas")
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    },[])
  );

  return (
    <Container>
      <Header />
      
      <Highlight title='Turmas' subtitle='Jogue com a sua turma'/>
      
      { isLoading ? <Loading/> : 
          <FlatList
            data={ groups }
            keyExtractor={ item => item }
            renderItem ={ ({ item }) => (
              <GroupCard 
                title={item}
                onPress={() => { handleOpenGroup(item) }} 
              />
            )}
            ListEmptyComponent = {() => (
              <ListEmpty message='Que tal cadastrar a primeira turma?' />
            )}
            contentContainerStyle={
              groups.length === 0 && { flex: 1 }
            }
            showsVerticalScrollIndicator={false}
          />
      }
      
      <Button 
        title='Criar nova turma' 
        onPress={handleNewGroup}
      />
      
    </Container>
  );
}