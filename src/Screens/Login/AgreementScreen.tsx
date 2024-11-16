import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Colors from '../../Style/Colors';
import UIText from '../../Component/UIText';
import Modal from 'react-native-modals';
const AgreementScreen = (props: any) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white', borderRadius: 10}}>
      <ScrollView style={{paddingHorizontal: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Điều khoản sử dụng
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>1. Giới thiệu</Text>
        <Text style={{fontSize: 15}}>
          Chào mừng quý khách hàng đến với Health Care. Chúng tôi là CÔNG TY CỔ
          PHẦN DƯỢC PHẨM HEALTH CARE thông qua ứng dụng Health Care đã được đăng
          ký chính thức với Bộ Công Thương Việt Nam. Khi quý khách hàng truy cập
          vào ứng dụng SK Health Care của chúng tôi có nghĩa là quý khách đồng ý
          với các điều khoản này. Ứng dụng có quyền thay đổi, chỉnh sửa, thêm
          hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này,
          vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên
          ứng dụng mà không cần thông báo trước. Và khi quý khách tiếp tục sử
          dụng ứng dụng, sau khi các thay đổi về Điều khoản này được đăng tải,
          có nghĩa là quý khách chấp nhận với những thay đổi đó.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          2. Hướng dẫn sử dụng ứng dụng
        </Text>
        <Text style={{fontSize: 15}}>
          Khi vào ứng dụng (APP) của chúng tôi, khách hàng phải đảm bảo đủ 18
          tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp
          pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các
          giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt
          Nam. Chúng tôi sẽ cấp một tài khoản (Account) sử dụng để khách hàng có
          thể sử dụng các tiện ích trên APP trong khuôn khổ Điều khoản và Điều
          kiện sử dụng đã đề ra. Quý khách hàng sẽ phải đăng ký tài khoản với
          thông tin xác thực về bản thân và phải cập nhật nếu có bất kỳ thay đổi
          nào. Mỗi người truy cập phải có trách nhiệm với mật khẩu, tài khoản và
          hoạt động của mình trên web và APP. Hơn nữa, quý khách hàng phải thông
          báo cho chúng tôi biết khi tài khoản bị truy cập trái phép. Chúng tôi
          không chịu bất kỳ trách nhiệm nào, dù trực tiếp hay gián tiếp, đối với
          những thiệt hại hoặc mất mát gây ra do quý khách không tuân thủ quy
          định. Nghiêm cấm sử dụng bất kỳ phần nào của APP này với mục đích
          thương mại hoặc nhân danh bất kỳ đối tác thứ ba nào nếu không được
          chúng tôi cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong
          đây, chúng tôi sẽ hủy tài khoản của khách mà không cần báo trước.
          Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ
          APP. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng
          cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          3. Ý kiến của khách hàngTất cả nội dung APP và ý kiến phê bình của quý
          khách đều là tài sản của chúng tôi.
        </Text>
        <Text style={{fontSize: 15}}>
          Nếu chúng tôi phát hiện bất kỳ thông tin giả mạo nào, chúng tôi sẽ
          khóa tài khoản của quý khách ngay lập tức hoặc áp dụng các biện pháp
          khác theo quy định của pháp luật Việt Nam.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          4. Thương hiệu và bản quyền
        </Text>
        <Text style={{fontSize: 15}}>
          Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội dung
          thông tin và tất cả các thiết kế, văn bản, đồ họa, phần mềm, hình ảnh,
          video, âm nhạc, âm thanh, biên dịch phần mềm, mã nguồn và phần mềm cơ
          bản đều là tài sản của chúng tôi. Toàn bộ nội dung APP được bảo vệ bởi
          luật bản quyền của Việt Nam và các công ước quốc tế. Bản quyền đã được
          bảo lưu.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>5. Quyền pháp lý</Text>
        <Text style={{fontSize: 15}}>
          Các điều kiện, điều khoản và nội dung của trang web này được điều
          chỉnh bởi luật pháp Việt Nam và Tòa án có thẩm quyền tại Việt Nam sẽ
          giải quyết bất kỳ tranh chấp nào phát sinh từ việc sử dụng trái phép
          APP này.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          6. Quy định về bảo mật
        </Text>
        <Text style={{fontSize: 15}}>
          Trang web và APP của chúng tôi coi trọng việc bảo mật thông tin và sử
          dụng các biện pháp tốt nhất bảo vệ thông tin của quý khách. Thông tin
          của quý khách sẽ được mã hóa để đảm bảo an toàn. Quý khách không được
          sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can
          thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. APP cũng nghiêm
          cấm việc phát tán, truyền bá hay cổ vũ cho bất kỳ hoạt động nào nhằm
          can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống. Cá nhân hay
          tổ chức vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố
          trước pháp luật nếu cần thiết. Mọi thông tin giao dịch sẽ được bảo mật
          ngoại trừ trong trường hợp cơ quan pháp luật yêu cầu.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          7. Luật pháp và thẩm quyền tại Lãnh thổ Việt Nam
        </Text>
        <Text style={{fontSize: 15}}>
          Tất cả các Điều Khoản và Điều Kiện này và Hợp Đồng (và tất cả nghĩa vụ
          phát sinh ngoài hợp đồng hoặc có liên quan) sẽ bị chi phối và được
          hiểu theo luật pháp của Việt Nam. Nếu có tranh chấp phát sinh bởi các
          Quy định Sử dụng này, quý khách hàng có quyền gửi khiếu nại/khiếu kiện
          lên Tòa án có thẩm quyền tại Việt Nam để giải quyết.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          8. Thông tin cá nhân và tính riêng tư
        </Text>
        <Text style={{fontSize: 15}}>
          Ngoài hệ thống lưu trữ dữ liệu của riêng mình, chúng tôi có thể sử
          dụng một số dịch vụ của bên thứ 3 để thu thập các thông tin (đã được
          mã hoá nặc danh) khi bạn sử dụng dịch vụ của Health Care trên Health
          Care App. Việc thuthập thông tin này giúp chúng tôi cá nhân hoá trải
          nghiệm của bạn cải tiến dịch vụ của chúng tôi và mang đến những thông
          điệp quảng cáo phù hợp với nhu cầu của bạn. Các thông tin thu thập
          được bạn chủ động gửi cho chúng tôi khi đăng ký tài khoản trên Health
          Care:
        </Text>
        <Text style={{fontSize: 15}}>
          • Tên họ, địa chỉ, số điện thoại, email, ngày sinh, giới tính
        </Text>
        <Text style={{fontSize: 15}}>
          • Các thông tin đăng ký khác khi bạn chủ động tham gia các chương
          trình có thu thập thông tin này
        </Text>
        <Text style={{fontSize: 15}}>
          • Để sử dụng các tính năng như tìm bằng hình ảnh, chúng tôi cũng dựa
          vào sự cho phép của bạn khi bạn muốn gửi hình cho chúng tôi
        </Text>
        <Text style={{fontSize: 15}}>
          Các thông tin thu thập tự động khi bạn sử dụng dịch vụ của chúng tôi
          trên App, ngoài hệ thống lưu trữ riêng, các thông tin này cũng được
          ghi nhận bởi các dịch vụ truy vấn dữ liệu khác bao gồm Facebook,
          Google, và Firebase: Tùy từng trường hợp, Health Care sẽ có biện pháp
          xử lý thích hợp, bao gồm khóa tài khoản mà không cần thông báo trước.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          b. Tạm khóa hoặc phong tỏa tài khoản sẽ chấm dứt khi có một trong các
          điều kiện sau:
        </Text>
        <Text style={{fontSize: 15}}>
          – Có văn bản/thông báo từ cơ quan có thẩm quyền về việc tất cả các
          giao dịch được thực hiện trên tài khoản là hợp pháp hoặc các tranh
          chấp về Tài Khoản đã được giải quyết hoặc yêu cầu chấm dứt phong tỏa
          tài khoản.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>
          c. Đóng/khóa tài khoản vĩnh viễn khi:
        </Text>
        <Text style={{fontSize: 15}}>
          – Health Care không nhận được bất kỳ phản hồi nào trong vòng 30 ngày
          kể từ khi gửi thông báo giới hạn tài khoản. – Yêu cầu khôi phục tài
          khoản của quý khách không được chấp thuận bởi Health Care. – Khi tài
          khoản không hoạt động quá 2 năm. – Các trường hợp khác do Pháp Luật
          quy định.
        </Text>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Khiếu nại</Text>
        <Text style={{fontSize: 15}}>
          Nhằm không ngừng nâng cao chất lượng dịch vụ và trải nghiệm tốt hơn
          cho người dùng, chúng tôi mong nhận được những ý kiến phản hồi hoặc
          khiếu nại về chất lượng dịch vụ. Xin vui lòng liên hệ: Hotline: +
          84-367399435
        </Text>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.navigation.goBack()}
        style={styles.btnModal}>
        <UIText
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Tôi đồng ý
        </UIText>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  btnModal: {
    paddingVertical: 10,
    marginHorizontal: 15,
    backgroundColor: Colors.mainColor,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 15,
  },
});

export default AgreementScreen;
