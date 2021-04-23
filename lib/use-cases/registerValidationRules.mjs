/* eslint-disable no-magic-numbers */
import LIVR         from 'livr';
import extraRules   from 'livr-extra-rules';

const defaultRules = {
    ...extraRules,
    'stringified_list'() {
        return (value, params, outputArr) => {
            if (!value) return;

            outputArr.push(String(value).split(','));
        };
    },
    'phone'() {
        return (value, params, outputArr) => {
            if (value) {
                const digits = value.replace(/\D/g, '');

                if (!digits.match(/(380)\d*/)) return 'WRONG_PHONE_FORMAT';
                if (digits.length !== 12) return 'WRONG_PHONE_LENGTH';

                outputArr.push(digits);
            }
        };
    }
};

LIVR.Validator.registerDefaultRules(defaultRules);
