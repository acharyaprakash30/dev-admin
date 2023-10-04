import React, { useEffect, useState } from 'react';
import { APP_CONFIG } from '../app/config';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import Logo from '../assets/images/logo/KTM-KART-logo.png';
import {
  Table,
  DataTableCell,
  TableCell,
  TableBody,
  TableHeader,
} from '@david.kucsai/react-pdf-table';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
  },
  img: {
    height: 50,
    width: 50,
  },
  textfont: {
    // fontFamily: 'Roboto',
  },
  header: {
    lineHeight: 1.5,
    backgroundColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: 0,
    // paddingTop: 80,
    paddingHorizontal: 40,
    paddingVertical: 10,
    fontSize: 12,
  },
  logo: {
    backgroundColor: '#E4E4E4',
  },
  section1: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: 10,
    padding: 10,
    margin: 10,
  },
  productHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    padding: 4,
    margin: 4,
  },
  productHdr: {
    borderBottom: 2,
    margin: 5,
  },
  report: {
    display: 'flex',
    // justifyContent:'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
    margin: 30,
    padding: 10,
    fontSize: 10,
  },
  image: {
    height: 'auto',
    position: 'relative',
    marginTop: 10,
    marginBottom: 40,
    width: 120,
  },
  headerAddress: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grandTotal: {
    padding: 5,
    fontSize: 12,
    fontWeight: 900,
  },
  fromTo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: 23,
    marginBottom: 10,
  },
  From: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  tableCell: { textAlign: 'center', fontSize: 12, padding: 5 },
  textDetails: {
    marginBottom: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});

// Font.register({
//   family: 'RobotoMedium',
//   fonts: [
//     {
//       src: RobotoMedium,
//     },
//   ],
// },
// );

const MyDocument = ({ order }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (order?.orderItems) {
      Array.isArray(order?.orderItems) &&
        order.orderItems.map((orderItem) => {
          // console.log(orderItem)
          return data.push({
            Order_no: `${order?.id}`,
            // direction: `${order?.direction}`,
            // location: `${order.delivery_address?.name}, ${order?.delivery_address?.municipality?.name}`,
            name: `${orderItem?.product?.name}` || '',
            quantity: `${orderItem?.quantity}`,
            unitPrice: `${orderItem?.product?.salePrice}`,
            productID: `${orderItem?.product?.id}`,
            tax: 0,
            amountNpr: `${orderItem?.totalPrice}`,
          });
        });
      setData([...data]);
    }
  }, [order]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image src={Logo} style={styles.image} />
          </View>
          <View>
            <View>
              <Text style={{ fontSize: 15, color: '#6F7378', lineHeight: 1.5 }}>
                PORFORMA INVOICE
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Text style={{ fontWeight: 400, fontSize: 10 }}>ORDER ID:</Text>
                <Text style={{ marginLeft: 5, fontSize: 9.5 }}>
                  {order?.id}{' '}
                </Text>
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <Text style={{ fontWeight: 400, fontSize: 10 }}>DATE:</Text>
              <Text style={{ marginLeft: 5, fontSize: 9.5 }}>
                {new Date().toDateString()}{' '}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 550,
              textAlign: 'center',
              paddingHorizontal: 20,
              marginVertical: 12,
            }}
          >
            Shipping Details
          </Text>
        </View>
        <View style={styles.fromTo}>
          <View style={styles.From}>
            <View>
              <Text style={{ fontWeight: 400, fontSize: 8 }}>FROM:</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 8,
                marginLeft: 15,
                paddingHorizontal: 2.5,
                paddingVertical: 2.5,
                backgroundColor: '#E6EEF7',
                width: '100%',
                borderRadius: 4,
              }}
            >
              <Text style={styles.textDetails}>{APP_CONFIG.APP_NAME} </Text>
              <Text style={styles.textDetails}>{APP_CONFIG.MAIL}</Text>
              <Text style={styles.textDetails}>{APP_CONFIG.WEBSITE}</Text>
            </View>
          </View>
          <View style={styles.From}>
            <View>
              <Text style={{ fontWeight: 400, fontSize: 8 }}>TO:</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 8,
                marginLeft: 15,
                backgroundColor: '#E6EEF7',
                paddingHorizontal: 2.5,
                paddingVertical: 2.5,
                width: '100%',
                borderRadius: 4,
              }}
            >
              <Text style={styles.textDetails}>
                {order?.user?.firstName} {order?.user?.lastName}{' '}
              </Text>
              <Text style={styles.textDetails}>{order?.user?.email} </Text>
              <Text style={styles.textDetails}>{order?.user?.phone} </Text>
              <Text style={styles.textDetails}>
                {order?.delivery_address &&
                typeof order?.delivery_address === 'object'
                  ? `${order?.delivery_address?.name}, ${order?.delivery_address?.municipality?.name},${order?.delivery_address?.municipality?.district?.name}, ${order?.delivery_address?.municipality?.district?.province?.name}, Nepal`
                  : order?.delivery_address || 'N/A'}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 550,
              textAlign: 'center',
              paddingHorizontal: 20,
              marginVertical: 12,
            }}
          >
            Order Details
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 35,
            textAlign: 'center',
            border: 1,
          }}
        >
          <Table data={data}>
            <TableHeader>
              {/* <TableCell
                weighting={0.3}
                style={{ textAlign: 'center', fontSize: 12 }}
              >
                Order No.
              </TableCell>  */}

              <TableCell style={styles.tableCell}>Item Description</TableCell>
              {/* <TableCell style={{ textAlign: 'center', fontSize: 12, padding: 2 }}>
                Product ID
              </TableCell> */}
              <TableCell weighting={0.35} style={styles.tableCell}>
                Quantity
              </TableCell>
              <TableCell weighting={0.3} style={styles.tableCell}>
                Price
              </TableCell>
              <TableCell weighting={0.3} style={styles.tableCell}>
                Tax
              </TableCell>
              <TableCell style={styles.tableCell}>Total Amount</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell
                style={{ textAlign: 'center', padding: 5 }}
                getContent={(r) => r?.name || ''}
              />
              {/* <DataTableCell
                style={{ textAlign: 'center', padding: 2 }}
                getContent={(r) => r?.productID}
              /> */}
              <DataTableCell
                weighting={0.35}
                style={{ textAlign: 'center', padding: 5 }}
                getContent={(r) => r?.quantity || ''}
              />
              <DataTableCell
                weighting={0.3}
                style={{ textAlign: 'center', padding: 5 }}
                getContent={(r) => r?.unitPrice || ''}
              />
              <DataTableCell
                weighting={0.3}
                style={{ textAlign: 'center', padding: 5 }}
                getContent={(r) => r?.tax || ''}
              />
              <DataTableCell
                style={{ textAlign: 'center', padding: 5 }}
                getContent={(r) => r?.amountNpr || ''}
              />
            </TableBody>
          </Table>
        </View>

        <View style={styles.report}>
          <View></View>
          <View>
            <Text style={{ padding: 5 }}>
              Sub Total{`                   `}Nrs.{order?.amount || ` 0.000`}
            </Text>
            <Text style={{ padding: 5 }}>
              Shipping cost{`            `}Nrs.{order?.shippingCost || ` 0.000`}
            </Text>
            <Text style={{ padding: 5 }}>
              Total Tax{`                    `}Nrs.{order?.tax || ` 0.000`}
            </Text>
            <Text style={{ padding: 5, borderBottom: 2 }}>
              Coupon Discount{`      `}Nrs.{order?.coupon_discount || ` 0.000`}
            </Text>
            <Text style={styles.grandTotal}>
              Grand Total{`           `}Nrs.
              {order?.amount - (order?.coupon_discount || 0)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;
