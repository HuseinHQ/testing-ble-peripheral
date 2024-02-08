import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import BLEPeripheral from 'react-native-ble-peripheral';
import {Buffer} from 'buffer';

const App = () => {
  useEffect(() => {
    const initPeripheral = async () => {
      try {
        // Inisialisasi BLE Peripheral
        await BLEPeripheral.initialize();

        // Definisi UUID untuk layanan dan karakteristik
        const SERVICE_UUID = '0000180F-0000-1000-8000-00805F9B34FB'; // Contoh UUID untuk layanan
        const CHARACTERISTIC_UUID = '00002A19-0000-1000-8000-00805F9B34FB'; // Contoh UUID untuk karakteristik

        // Membuat layanan
        const service = {
          uuid: SERVICE_UUID,
          characteristics: [
            {
              uuid: CHARACTERISTIC_UUID,
              value: 'Initial value',
              permissions: {
                read: true,
                write: true,
                // Berikan izin lainnya sesuai kebutuhan Anda
              },
              onReadRequest: async () => {
                // Logika untuk menangani permintaan membaca karakteristik
                console.log('Read request for characteristic');
                return Buffer.from('Read value').toString('base64');
              },
              // ...

              onWriteRequest: async newValue => {
                // Logika untuk menangani permintaan menulis karakteristik
                console.log('Write request for characteristic');
                console.log(
                  'New value:',
                  Buffer.from(newValue, 'base64').toString(),
                );
              },
            },
          ],
        };

        // Menambahkan layanan
        await BLEPeripheral.addService(service);
        console.log('Service added successfully');

        // Memulai perangkat sebagai Peripheral
        await BLEPeripheral.start();
        console.log('Peripheral started');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    initPeripheral();
  }, []);

  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <View style={containerStyle}>
      <Text>BLE Peripheral Example</Text>
    </View>
  );
};

export default App;
