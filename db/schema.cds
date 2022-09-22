namespace Receiver;

using {API_BUSINESS_PARTNER as apiBusiness} from '../srv/external/API_BUSINESS_PARTNER';

entity Business as projection on apiBusiness.A_BusinessPartner {
    key BusinessPartner          as ID,
        BusinessPartnerFullName  as fullName,
        BusinessPartnerIsBlocked as isBlocked
}

entity myBusiness {
    key ID        : String;
        fullName  : String;
        isBlocked : Boolean;
}
