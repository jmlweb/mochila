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

  describe('while notifying', () => {
    it('calls the next subscriber when one unsubscribes itself', () => {
      const subscription = Subscription<number>();
      const seen: string[] = [];
      const first = () => {
        seen.push('first');
        subscription.unsubscribe(first);
      };
      const second = () => seen.push('second');
      subscription.subscribe(first);
      subscription.subscribe(second);

      subscription.notify(1);

      expect(seen).toEqual(['first', 'second']);
    });

    it('calls every subscriber once when several unsubscribe themselves', () => {
      const subscription = Subscription<number>();
      const calls = [0, 0, 0];
      const subscribers = calls.map((_, index) => {
        const subscriber = () => {
          calls[index] = (calls[index] ?? 0) + 1;
          subscription.unsubscribe(subscriber);
        };
        subscription.subscribe(subscriber);
        return subscriber;
      });

      subscription.notify(1);

      expect(subscribers).toHaveLength(3);
      expect(calls).toEqual([1, 1, 1]);
    });

    it('still calls a subscriber removed by an earlier one in the same round', () => {
      const subscription = Subscription<number>();
      const second = jest.fn();
      subscription.subscribe(() => subscription.unsubscribe(second));
      subscription.subscribe(second);

      subscription.notify(1);
      subscription.notify(2);

      expect(second).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledWith(1);
    });

    it('does not call a subscriber added during the round until the next one', () => {
      const subscription = Subscription<number>();
      const late = jest.fn();
      subscription.subscribe(() => subscription.subscribe(late));

      subscription.notify(1);
      expect(late).not.toHaveBeenCalled();

      subscription.notify(2);
      expect(late).toHaveBeenCalledWith(2);
    });

    it('does nothing when there are no subscribers', () => {
      expect(() => Subscription<number>().notify(1)).not.toThrow();
    });
  });

  describe('initialSubscribers', () => {
    it('calls the initial subscribers', () => {
      const initial = jest.fn();
      Subscription<number>([initial]).notify(5);
      expect(initial).toHaveBeenCalledWith(5);
    });

    it('does not mutate the array passed in', () => {
      const initial = jest.fn();
      const passed = [initial];
      const subscription = Subscription<number>(passed);

      subscription.subscribe(jest.fn());
      subscription.unsubscribe(initial);
      subscription.reset();

      expect(passed).toEqual([initial]);
    });

    it('ignores later changes to the array passed in', () => {
      const initial = jest.fn();
      const added = jest.fn();
      const passed = [initial];
      const subscription = Subscription<number>(passed);

      passed.push(added);
      passed.length = 0;
      subscription.notify(1);

      expect(initial).toHaveBeenCalledWith(1);
      expect(added).not.toHaveBeenCalled();
    });
  });
});
