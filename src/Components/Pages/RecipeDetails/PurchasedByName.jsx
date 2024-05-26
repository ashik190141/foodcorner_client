import React from 'react';
import usePurchaserName from '../../../Hooks/usePurchaserName';

const PurchasedByName = ({id}) => {
    console.log(id);
    const [allPurchaserName] = usePurchaserName(id);
    console.log(allPurchaserName);
    return (
      <div>
        {allPurchaserName?.data?.length != 0 && (
          <div>
            <h1 className="text-xl pb-1">Purchased By</h1>
            {allPurchaserName?.data?.map((name) => (
              <p key={name}>{name}</p>
            ))}
          </div>
        )}
      </div>
    );
};

export default PurchasedByName;