using {Receiver as my} from '../db/schema';

@requires: 'authenticated-user'
service ReceiverService {
    // @requires: 'viewer'
    entity Business   as projection on my.Business;

    // @requires: 'viewer'
    entity myBusiness as projection on my.myBusiness;
}
