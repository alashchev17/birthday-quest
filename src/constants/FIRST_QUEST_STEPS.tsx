import { Form, Radio } from 'antd'

import { DEVICE_WIDTH } from './DEVICE_WIDTH'

const STYLES_FOR_SHRINKING: React.CSSProperties = {
  flexShrink: DEVICE_WIDTH < 768 ? 0 : 1,
  width: 'calc(100% / 3)',
  fontSize: DEVICE_WIDTH < 768 ? '12px' : '16px',
}

export const FIRST_QUEST_STEPS = [
  {
    title: 'Цвет',
    content: (
      <Form.Item
        name="favouriteColor"
        label="Какой мой любимый цвет?"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Radio.Group
          buttonStyle="solid"
          size="large"
          style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
        >
          <Radio.Button value="a" style={STYLES_FOR_SHRINKING}>
            Красный
          </Radio.Button>
          <Radio.Button value="b" style={STYLES_FOR_SHRINKING}>
            Голубой
          </Radio.Button>
          <Radio.Button value="c" style={STYLES_FOR_SHRINKING}>
            Фиолетовый
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    ),
  },
  {
    title: 'Первый поцелуй',
    content: (
      <Form.Item
        name="firstKiss"
        label="Когда мы впервые поцеловались?"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Radio.Group
          buttonStyle="solid"
          size="large"
          style={{ display: 'flex', width: '100%' }}
        >
          <Radio.Button value="a" style={STYLES_FOR_SHRINKING}>
            {DEVICE_WIDTH < 768 ? '05.04.2023' : '5 апреля 2023'}
          </Radio.Button>
          <Radio.Button value="b" style={STYLES_FOR_SHRINKING}>
            {DEVICE_WIDTH < 768 ? '07.04.2023' : '7 апреля 2023'}
          </Radio.Button>
          <Radio.Button value="c" style={STYLES_FOR_SHRINKING}>
            {DEVICE_WIDTH < 768 ? '15.04.2023' : '15 апреля 2023'}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    ),
  },
  {
    title: 'Любимая сладость',
    content: (
      <Form.Item
        name="favouriteSweet"
        label="Какая моя любимая сладость?"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Radio.Group
          buttonStyle="solid"
          size="large"
          style={{ display: 'flex', width: '100%' }}
        >
          <Radio.Button value="a" style={STYLES_FOR_SHRINKING}>
            Шоколад
          </Radio.Button>
          <Radio.Button value="b" style={STYLES_FOR_SHRINKING}>
            Желейки
          </Radio.Button>
          <Radio.Button value="c" style={STYLES_FOR_SHRINKING}>
            Печеньки
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
    ),
  },
]
