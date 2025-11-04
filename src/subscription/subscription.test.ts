import { Subscription } from './subscription';

describe('Subscription', () => {
  it('should create an instance', () => {
    expect(Subscription()).toBeTruthy();
  });
  it('should be able to subscribe', () => {
    const subscription = Subscription();
    expect(subscription.subscribe).toBeTruthy();
  });
  it('should be able to unsubscribe', () => {
    const subscription = Subscription();
    expect(subscription.unsubscribe).toBeTruthy();
  });
  it('should be able to notify', () => {
    const subscription = Subscription();
    expect(subscription.notify).toBeTruthy();
  });
  it('when a subscriber is notified, it should receive the data', () => {
    const subscription = Subscription();
    const subscriber = jest.fn();
    subscription.subscribe(subscriber);
    subscription.notify('test');
    expect(subscriber).toHaveBeenCalledWith('test');
  });
  it('after resetting, subscribers should not be notified', () => {
    const subscription = Subscription();
    const subscriber = jest.fn();
    subscription.subscribe(subscriber);
    subscription.reset();
    subscription.notify('test');
    expect(subscriber).not.toHaveBeenCalled();
  });
  it('after unsubscribing, subscribers should not be notified', () => {
    const subscription = Subscription();
    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    subscription.subscribe(subscriber1);
    subscription.subscribe(subscriber2);
    subscription.unsubscribe(subscriber1);
    subscription.notify('test');
    expect(subscriber1).not.toHaveBeenCalled();
    expect(subscriber2).toHaveBeenCalledWith('test');
  });
});
