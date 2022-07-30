---
title: '[디자인패턴] 추상 팩토리(Abstract Factory)'
author_profile: true
uml: true
toc_label: '[디자인패턴] 추상 팩토리(Abstract Factory)'
post-order: 1
---

## 추상 팩토리(Abstract Factory)란?
추상 팩토리(Abstract Factory) 패턴은 GoF 디자인 패턴 중 생성 패턴에 속하며, **구체적인 클래스에 의존하지 않고 서로 연관되거나 의존적인 객체들의 집합별로 생성 시 인터페이스를 제공하는 패턴**입니다. 관련 여러 종류의 객체를 생성해야 할 때 유용하게 사용하는 패턴입니다.

![](https://drive.google.com/uc?export=view&id=1-6M70QPawPAtia5PZSfFpijLq4Gh63tG){: .align-center}
&lt;그림 1. Abstract Factory UML Diagram&gt;
{: style="text-align: center;"}

<p class=short>각 클래스의 역할을 설명하면 다음과 같습니다.</p>

- AbstractFactory
    - 실제 팩토리 클래스의 공통 인터페이스. 각 제품의 부품을 생성하는 기능을 추상 메서드로 정의
- ConcreteFactory
    - 구체적 팩토리 클래스로 AbstractFactory 클래스의 추상 메서드를 오버라이딩하여 관련 객체들 생성
- AbstractProduct
    - 관련 객체 공통 인터페이스
- ConcreteProduct
    - 실제 팩토리 클래스에서 생성되는 객체

## 예제 - 엘리베이터 제조 시 부품과 생산 업체
엘리베이터를 구성하는 많은 부품 중 모터와 문을 생각해봅시다. &lt;그림 2&gt;는 팩토리 메서드 패턴을 사용해서 부품 업체에 맞는 모터와 문을 생성하도록 설계한 클래스 다이어그램입니다.

![](https://drive.google.com/uc?export=view&id=1GrPcAkKhll2KT3MgfVfi3CMzSwBdy51O){: .align-center}
&lt;그림 2. Motor & Door 팩토리 메서드 패턴&gt;
{: style="text-align: center;"}

## 문제점 1 - 부품 추가 시 추가 부품별 팩토리 클래스 생성, 클라이언트 코드에 업체 식별 인자 중복 전달
모터와 문은 물론이고 램프 3종류, 센서 2종류, 스피커 1종류, 버튼 2종류 등 총 10개의 부품을 사용해야 하면 각 부품마다 팩토리 클래스를 구현해야 하는데 이는 코드의 길이를 길고 복잡하게 만들어 유지보수를 어렵게 합니다.

![](https://drive.google.com/uc?export=view&id=1o3RqGRIGyW2lf9bne7mPeOfohENtBED4){: .align-center}
&lt;그림 3. 추가 팩토리 클래스들&gt;
{: style="text-align: center;"}

또한 클라이언트의 부품을 생성하는 코드에서 부품 생산 업체에 대한 코드(`VendorID`)가 중복되어 길어집니다.

```java
public class Client {
    public static void main(String[] args) {
        Door hyundaiDoor = DoorFactory.createDoor(VendorID.HYUNDAI);
        Motor hyundaiMotor = MotorFactory.createMotor(VendorID.HYUNDAI);
        hundaiMotor.setDoor(hyundaiDoor);

        // 추가 코드
        ArrivalSensor hyundaiArrivalSensor = ArrivalSensorFactory.createArrivalSensor(VendorID.HYUNDAI);
        ...
        FloorButton hyundaiFloorButton = FloorButtonFactory.createElevatorFloorButton(VendorID.HYUNDAI);
    }
}
```

## 문제점 2 - 새 업체의 부품 지원 시 각 팩토리 클래스마다 코드 수정 필요
예를 들어 삼성에서 엘리베이터 부품 사업을 시작하면 SamsungMotor, SamsungDoor 클래스 등을 지원해야 합니다. 이 경우 MotorFactory, DoorFactory 클래스가 삼성의 부품클래스를 지원하도록 수정되야 합니다.

```java
public class DoorFactory {
    public static Door createDoor(VendorID vendorID) {
        Door door = null;

        switch (vendorID) {
            case LG:
                door = new LGDoor();
                break;
            case HYUNDAI:
                door = new HyundaiDoor();
                break;
            case SAMSUNG: // 추가
                door = new SamsungDoor();
                break;
        }

        return door;
    }
}
```

부품별 팩토리 클래스가 많을 경우 일일이 코드를 추가해야하기 때문에 번거롭습니다.

## 해결책 - 추상 팩토리 패턴
엘리베이터는 특정 모터와 특정 문을 제어할 필요가 있습니다. 이 때 일반적으로 현대 모터를 사용하면 현대 문을 사용하고, LG 모터를 사용하면 LG 문을 사용할 것입니다. 이와 같이 **여러 종류의 객체를 생성할 때 객체들 사이에 관련성이 있는 경우 부품별 Factory 클래스 대신 관련 객체들을 일관성 있게 생성하는 Factory 클래스를 사용하는 것이 편리**합니다.

이제 부품별 팩토리 클래스인 MotorFactory, DoorFactory 대신 LGElevatorFactory, HyundaiElevatorFactory 같이 업체별 팩토리 클래스를 이용합니다.

![](https://drive.google.com/uc?export=view&id=10LyTlNAmUwffbC_T3Fpwhj24a3VEI9TP){: .align-center}
&lt;그림 4. 업체별 팩토리 클래스를 사용한 클래스 다이어그램&gt;
{: style="text-align: center;"}

### 문제점 1 해결 - 부품 코드만 추가, 업체 식별 코드 중복 제거
추상 팩토리 패턴을 사용하면 부품 추가 시 관련 클래스를 작성하면 팩토리 클래스에서는 관련 메서드만 추가하면 됩니다.

![](https://drive.google.com/uc?export=view&id=1_v6J89DfQgxz7-XhytaNc2Vb_Xf68MyF){: .align-center}
&lt;그림 5. 스피커 추가 시 스피커 클래스, 생성 메서드만 추가&gt;
{: style="text-align: center;"}

또한 부품 생성과 관련된 클라이언트 코드에서 업체를 식별하기 위한 중복 코드를 제거할 수 있습니다.

```java
public class Client {
    public static void main(String[] args) {
        ElevatorFactory factory = null;
        String vendorName = args[0];

        // 업체 식별 조건문을 실행해 관련 팩토리 객체 생성
        if (vendorName.equalsIgnoreCase("LG")) {
            factory = new LGElevatorFactory();
        } else {
            factory = new HyundaiElevatorFactory();
        }

        // 생성된 팩토리 객체가 적절한 부품 생성
        Door door = factory.createDoor();
        Motor motor = factory.createMotor();
        motor.setDoor(door);

        door.open();
        motor.move(Direction.UP);
    }
}
```

### 문제점 2 해결 - 새 업체에 대한 팩토리 클래스만 생성
새 업체가 엘리베이터 부품 사업을 하더라도 새 업체에 대한 팩토리 클래스만을 생성하고 관련 부품을 생성하도록 설계하면 됩니다.

![](https://drive.google.com/uc?export=view&id=18uayc2qdluk7dfd3zFH7SWCVWxd7RVmo){: .align-center}
&lt;그림 6. 삼성 팩토리 클래스만 생성&gt;
{: style="text-align: center;"}

## 팩토리 메서드 + 싱글턴 + 추상 팩토리 패턴을 적용한 업체별 엘리베이터 제조

![](https://drive.google.com/uc?export=view&id=1Vcw0z0Bf3JvkSScgDOTPIvgmwPOwTyo8){: .align-center}
&lt;그림 7. 팩토리 메서드 + 싱글턴 + 추상 팩토리 패턴 엘리베이터 제조 클래스 다이어그램&gt;
{: style="text-align: center;"}

```java
public class ElevatorFactoryFactory { // 팩토리 클래스에 팩토리 메서드 패턴 적용
    public static ElevatorFactory getFactory(VendorID vendorID) {
        ElevatorFactory factory = null;

        switch (vendorID) {
            case LG:
                factory = LGElevatorFactory.getInstance();
                break;
            case HYUNDAI:
                factory = HyundaiElevatorFactory.getInstance();
                break;
            case SAMSUNG:
                factory = SamsungElevatorFactory.getInstance();
                break;
        }
        
        return factory;
    }
}

public abstract class ElevatorFactory {
    public abstract Motor createMotor();
    public abstract Door createDoor();
}

public class LGElevatorFactory extends ElevatorFactory {
    private static ElevatorFactory factory;
    private LGElevatorFactory() { }

    public static ElevatorFactory getInstance() { // 팩토리 클래스에 싱글턴 패턴 적용
        if (factory == null)
            factory = new LGElevatorFactory();

        return factory;
    }

    public Motor createMotor() {
        return new LGMotor();
    }

    public Door createDoor() {
        return new LGDoor();
    }
}

... // HyundaiElevatorFactory, SamsungElevatorFactory 생략

public class Client {
    public static void main(String[] args) {
        String vendorName = args[0];
        VendorID vendorID;

        if (vendorName.equalsIgnoreCase("LG"))
            vendorID = VendorID.LG;
        else if (vendorName.equalsIgnoreCase("HYUNDAI"))
            vendorID = VendorID.HYUNDAI;
        else
            vendorID = VendorID.SAMSUNG;
        
        ElevatorFactory factory = ElevatorFactoryFactory.getFactory(vendorID);

        Motor motor = factory.createMotor();
        Door door = factory.createDoor();
        motor.setDoor(door);

        door.open();
        motor.move(Direction.UP);
    }
}
```

## A. 참조
I. S. Jung and H. S. Chae, "추상 팩토리 패턴," in *JAVA 객체지향 디자인 패턴*, Seoul, Korea: 한빛미디어, 2014, ch. 13, pp. 342-364.

heejeong Kwon, "[Design Pattern] 추상 팩토리 패턴이란," *Github.io*, Aug. 8, 2018. [Online]. Available: [https://gmlwjd9405.github.io/2018/08/08/abstract-factory-pattern.html](https://gmlwjd9405.github.io/2018/08/08/abstract-factory-pattern.html) [Accessed Jul. 30, 2022].
